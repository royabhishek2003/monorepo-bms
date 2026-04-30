import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import { WebSocketServer, WebSocket } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({ port: 8080 });

// Determine credentials based on NODE_ENV
const isProduction = process.env.NODE_ENV === "production";
const WS_USERNAME = isProduction ? "prod1" : "stage1";
const WS_PASSWORD = isProduction ? "prod1pass" : "stage1pass";

console.log(`Running in ${isProduction ? "production" : "staging"} mode`);

server.on("connection", async (socket: WebSocket) => {
  console.log("Client connected");

  try {
    console.log("Before DB call");

    const res = await client.user.create({
      data: {
        username: WS_USERNAME,
        password: WS_PASSWORD
      }
    });

    console.log("After DB call");
    console.log("DB RESPONSE:", res);

  } catch (error) {
    console.log("ERROR:", error);
  }
});

console.log("WebSocket server is running on ws://localhost:8080");