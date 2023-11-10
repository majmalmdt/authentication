import express from "express";
import http from "http";
import cors from "cors";
import executeMiddleware from "./middlewareHandler.js";
import { getBlock } from "./utils.js";
import { env } from "@appblocks/node-sdk";

env.init()

const appHandler = async (req, res, next) => {
  try {
    let url = req.params[0];

    if (url.includes("health")) {
      req.params.health = "health";
      url = url.split("/")[0]
    }

    const { block, route } = getBlock(url);
    if (!block) {
      console.log("No block found for url -> ", url);
      res.send("requested function not registered in app.").status(404);
      res.end();
      return;
    }

    console.log("\nRequest to block ", block.name);
    // Execute middleware functions
    await executeMiddleware(block.middlewares, { req, res, next });

    const isDev = process.env.NODE_ENV !== "production";
    const importPath = isDev ? route + "?update=" + Date.now() : route;
    const handler = await import(importPath);

    console.log("handler: ", handler);
    await handler.default({ req, res, next });
  } catch (err) {
    console.error(err);
    res.send("Something went wrong. Please check function log").status(500);
  }
};

const app = express();
app.use(cors());
app.all("/*", appHandler);

const server = http.createServer(app);
server.listen(5000);
console.log("Functions emulated on port 5000");