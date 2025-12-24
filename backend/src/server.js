import express from "express";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "../lib/db.js";
import { ENV } from "../lib/env.js";

const __dirname = path.resolve();
const app = express();
const port = process.env.Port;
app.use(express.json());

//All routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment
if ((process.env.Node_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log("server is runing:" + port);
  connectDB();
});
