import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    attachments: { type: [{ url: String, localPath: String }], default: [] },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
