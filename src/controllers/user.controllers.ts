import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { User } from "../models/user-model";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      throw new ErrorHandler(404, "Users not found!");
    }
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id }).select("-password");
    if (!user) {
      throw new ErrorHandler(404, "Users not found!");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { keyword } = req.query;

    const user = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    }).select("-password");

    if (!user) {
      throw new ErrorHandler(404, "Users not found!");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};
