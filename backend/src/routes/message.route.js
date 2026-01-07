import express from "express";
import {
  getAllContact,
  getMessageByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message..controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const route = express.Router();
route.use(protectRoute);

route.get("/contacts", getAllContact);
route.get("/chats", getChatPartners);
route.get("/:id", getMessageByUserId);
route.post("/send/:id", sendMessage);

export default route;
