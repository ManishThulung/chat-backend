import express from "express";
import { createHouse, getHouses } from "../controllers/houseController";

const router = express.Router();

router.get("/", getHouses);
router.post("/create", createHouse);

export default router;
