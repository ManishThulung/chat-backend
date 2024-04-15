import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { User } from "../models/user-model";
import { Chat } from "../models/chat-model";
import { Message } from "../models/message-model";

export const getChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ participants: userId }).populate(
      "participants"
    );
    if (!chats) {
      throw new ErrorHandler(404, "chats not found!");
    }
    res.status(200).json({ data: chats });
  } catch (error) {
    next(error);
  }
};

export const chatExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { senderId, receiverId } = req.params;
    console.log(senderId, receiverId);
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    console.log(chat, "chat");
    if (!chat) {
      return res.status(200).json({ data: null });
    }
    res.status(200).json({ data: chat });
  } catch (error) {
    next(error);
  }
};

export const createChat = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query;
    const { chatId, content } = req.body;

    const user = await User.findById({ _id: userId });

    if (!user) {
      throw new ErrorHandler(404, "Users not found!");
    }

    if (chatId === null) {
      const chat = await Chat.create({
        isGroupChat: false,
        participants: [req.user.id, user._id],
        admin: req.user.id,
      });

      const message = await Message.create({
        sender: req.user.id,
        content,
        chat: chat._id,
      });
      res.status(200).json({ data: user, admin: req.user, chat, message });
    }

    const chat = await Chat.findById({ _id: chatId });
    if (!chat) {
      throw new ErrorHandler(404, "chat not found!");
    }

    const newMessage = await Message.create({
      sender: req.user.id,
      content,
      chat: chat._id,
    });
    const message = await Message.findById({ _id: newMessage._id }).populate(
      "sender"
    );
    const io = res.app.get("io");
    // io.emit("message", 'hello')

    // io.on("connection", (socket) => {
    //   console.log(socket.id, "iddd")
    //   console.log(message, "msg")
    //   socket.emit("message", message);
    // });
    message && io.emit("sendMessage", message);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.query;

    if (!chatId) {
      throw new ErrorHandler(403, "chat cannot be null!");
    }

    const chat = await Chat.findById({ _id: chatId });
    if (!chat) {
      throw new ErrorHandler(404, "chat not found!");
    }

    const messages = await Message.find({ chat: chatId }).populate("sender");
    res.status(200).json({ data: messages });
  } catch (error) {
    next(error);
  }
};
