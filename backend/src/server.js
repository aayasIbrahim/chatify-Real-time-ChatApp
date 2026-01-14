import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "../lib/db.js";
import cors from "cors";
import {app,server} from "../lib/socket.js";

import { ENV } from "../lib/env.js";
const __dirname = path.resolve();
// const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({limit: '10mb'}));

app.use(cookieParser());

//All routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Chatify Backend is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const { PORT } = ENV;

server.listen(PORT, () => {
  connectDB();
  console.log("server is runing:" + PORT);
});
