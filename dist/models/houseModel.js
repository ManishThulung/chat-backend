"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gardenModel_1 = require("./gardenModel");
const houseSchema = new mongoose_1.default.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    // one to one
    garden: gardenModel_1.gardenSchema,
    // one to many
    rooms: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Room" }],
});
const House = mongoose_1.default.model("House", houseSchema);
exports.default = House;
//# sourceMappingURL=houseModel.js.map