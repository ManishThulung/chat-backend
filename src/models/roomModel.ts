import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  floor: Number,
  number: Number,
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
