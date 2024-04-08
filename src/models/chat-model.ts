import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
