import express from "express";
import { createChat, getChatById, getChats } from "../controllers/chat.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/user-chats/:userId", getChats);
router.get("/:id", getChatById);
router.post("/create/:userId", verifyToken, createChat);

export default router;
