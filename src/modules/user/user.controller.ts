import { Request, Response } from "express";
import { UserServices } from "./user.services";
import { userIdValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserDB(user);

    return res.status(200).json({
      success: true,
      message: "user is created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserDB();

    if (result && result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
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

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error getting user",
      error: error.errors || error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = req.body;

    const numericUserId = Number(userId);
    const validationZod = userIdValidationSchema.parse(numericUserId);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await UserServices.updateUserDB(validationZod, updatedUser);

    const dynamicResponse: Record<string, unknown> = {};
    Object.keys(updatedUser).forEach((key) => {
      if (key !== "password") {
        dynamicResponse[key] = updatedUser[key];
      }
    });

    return res.status(200).json({
      success: true,
      message: "User is updated successfully",
      data: dynamicResponse,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const numericUserId = Number(userId);

    const result = await UserServices.deleteUserDB(numericUserId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: "user is deleted successfully",
      data: result,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await UserServices.createOrderDB(orderData);

    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating Order !",
      error: error.message,
    });
  }
};

export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  createOrder,
};
