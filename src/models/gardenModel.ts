import mongoose from "mongoose";

export const gardenSchema = new mongoose.Schema({
  name: String,
});

const Garden = mongoose.model("Garden", gardenSchema);

export default Garden;
