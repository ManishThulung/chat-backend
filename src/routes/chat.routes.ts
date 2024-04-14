import express from "express";
import {
  createChat,
  getChats,
  getMessages,
  chatExist,
} from "../controllers/chat.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/user-chats/:userId", getChats);
router.get("/messages", getMessages);
router.post("/send-message", verifyToken, createChat);
router.get("/chat-exist/:senderId/:receiverId", chatExist);

export default router;
