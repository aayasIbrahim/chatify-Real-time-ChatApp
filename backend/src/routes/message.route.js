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

route.get("/contact", getAllContact);
route.get("/chat", getChatPartners);
route.get("/:id", getMessageByUserId);
route.post("/:id/send", sendMessage);

export default route;
