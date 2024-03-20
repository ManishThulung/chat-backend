import express from "express";
import {
  getUserById,
  getUsers,
  searchUser,
} from "../controllers/user.controllers";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/search/friends", searchUser);

export default router;
