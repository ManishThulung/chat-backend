import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { User } from "../models/user-model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ErrorHandler(402, "User already exist, Login instead!");
    }

    const user = await User.create({ name, email, password });
    const accessToken = user.generateAccessToken();
    res
      .status(201)
      .json({
        success: true,
        message: "register successful",
        data: user,
        accessToken,
      });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, "Invalid Credentials");
    }

    const accessToken = user.generateAccessToken();

    res
      .status(200)
      .json({
        success: true,
        message: "login successful",
        data: user,
        accessToken,
      });
  } catch (error) {
    next(error);
  }
};
