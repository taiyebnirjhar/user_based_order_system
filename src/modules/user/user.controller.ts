import { Request, Response } from "express";
import { UserServices } from "./user.services";
import { userIdValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserDB(user);

    res.status(200).json({
      success: true,
      message: "user is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserDB();

    res.status(200).json({
      success: true,
      message: "Users are retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting user",
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const numericUserId = Number(userId);

    const validationZod = userIdValidationSchema.parse(numericUserId);

    const result = await UserServices.getSingleUserDB(validationZod);

    res.status(200).json({
      success: true,
      message: "User is retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error getting user",
      error: error.errors || error.message,
    });
  }
};

export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUser,
};
