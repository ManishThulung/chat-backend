"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const houseController_1 = require("../controllers/houseController");
const router = express_1.default.Router();
router.get("/", houseController_1.getHouses);
router.post("/create", houseController_1.createHouse);
exports.default = router;
//# sourceMappingURL=houseRoutes.js.map