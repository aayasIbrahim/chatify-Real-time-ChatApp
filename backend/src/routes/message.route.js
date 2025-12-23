import express from "express";
const route = express.Router();

route.get("/send", (req, res) => {
  res.send("send message endpoint");
});

export default route;
