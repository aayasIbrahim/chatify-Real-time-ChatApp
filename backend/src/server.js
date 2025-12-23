// const express=require("express");
import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
dotenv.config()
const app = express();
const port=process.env.Port


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.listen(port, () => {
  console.log("server is runing:"+ port);
});
