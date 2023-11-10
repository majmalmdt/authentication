import jwt from 'jsonwebtoken';

const handler = async (event) => {

  const { req, res } = event
  const secretKey = 'your-secret-key';

  // health check
  if (req.params["health"] === "health") {
    res.send(JSON.stringify({ success: true, msg: "Health check success" }))
    return
  }
  const { username, password } = await getBody(req)
  const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.send(JSON.stringify({ success: true, msg: "Login Successful", Token: token }))
  } else {
    res.send(JSON.stringify({ success: true, msg: 'Login failed' }));
  }


}
const getBody = async (req) => {
  const bodyBuffer = []
  for await (const chunk of req) {
    bodyBuffer.push(chunk)
  }
  const data = Buffer.concat(bodyBuffer).toString()
  return JSON.parse(data || '{}')
}
export default handler
