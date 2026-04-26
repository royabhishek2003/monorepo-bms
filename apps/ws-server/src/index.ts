import "dotenv/config";
import { WebSocketServer, WebSocket } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", async (socket: WebSocket) => {
  console.log("Client connected");

  try {
    console.log("Before DB call");

    const res = await client.user.create({
      data: {
        username: "test",
        password: "test"
      }
    });

    console.log("After DB call"); // 👈 will this print?
    console.log("DB RESPONSE:", res);

  } catch (error) {
    console.log("ERROR:", error);
  }
});

console.log("WebSocket server is running on ws://localhost:8080");