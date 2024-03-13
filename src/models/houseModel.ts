import mongoose from "mongoose";
import { gardenSchema } from "./gardenModel";

const houseSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  // one to one
  garden: gardenSchema,

  // one to many
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
});

const House = mongoose.model("House", houseSchema);

export default House;
