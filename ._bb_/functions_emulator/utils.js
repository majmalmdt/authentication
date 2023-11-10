import path from "path";

const getBlock = (url) => {
  const blocks = {
  "login": {
    "name": "login",
    "type": "function",
    "directory": "/mnt/d/ionaught/App blocks/login/login",
    "middlewares": [],
    "relativeDirectory": "login"
  },
  "register": {
    "name": "register",
    "type": "function",
    "directory": "/mnt/d/ionaught/App blocks/login/register",
    "middlewares": [],
    "relativeDirectory": "register"
  }
};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

const getMiddlewareBlock = (url) => {
  const blocks = {};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

export { getBlock, getMiddlewareBlock };