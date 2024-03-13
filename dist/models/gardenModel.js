"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gardenSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.gardenSchema = new mongoose_1.default.Schema({
    name: String,
});
const Garden = mongoose_1.default.model("Garden", exports.gardenSchema);
exports.default = Garden;
//# sourceMappingURL=gardenModel.js.map