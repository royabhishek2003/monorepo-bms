import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import express from "express";
import { client } from "@repo/db/client";

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await client.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.json({ message: "User created", user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
