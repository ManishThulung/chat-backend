import express from "express";
import {
  createChat,
  getChats,
  getMessages,
} from "../controllers/chat.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/user-chats/:userId", getChats);
// router.get("/", getChatById);
router.get("/messages", getMessages);
router.post("/send-message", verifyToken, createChat);

export default router;
