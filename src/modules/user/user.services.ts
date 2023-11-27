import IUser from "./user.interface";
import { UserModel } from "./user.model";
import userValidationSchema from "./user.validation";

const createUserDB = async (user: IUser) => {
  const existingUser = await UserModel.isUserExists(user.userId);
  if (existingUser) {
    throw new Error("User already exists!");
  }
  try {
    const validationZod = userValidationSchema.parse(user);

    const result = await UserModel.create(validationZod);
    return result;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUserDB = async () => {
  const result = await UserModel.find();

  return result;
};

const getSingleUserDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });

  return result;
};

const updateUserDB = async (userId: number, updatedUser: Partial<IUser>) => {
  const existingUser = await UserModel.isUserExists(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  try {
    const validatedUpdatedUser = userValidationSchema.parse(updatedUser);

    const result = await UserModel.updateOne({ userId }, [
      {
        $set: validatedUpdatedUser,
      },
    ]);

    return result;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const deleteUserDB = async (userId: number) => {
  const existingUser = await UserModel.isUserExists(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  const result = await UserModel.deleteOne({ userId });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createOrderDB = async (order) => {
  // const existingUser = await UserModel.isUserExists(user.userId);
  // if (existingUser) {
  //   throw new Error("User already exists!");
  // }
  // try {
  //   const validationZod = userValidationSchema.parse(user);
  //   const result = await UserModel.create(validationZod);
  //   return result;
  // } catch (error) {
  //   throw new Error(`Error creating user: ${error.message}`);
  // }
};

export const UserServices = {
  createUserDB,
  getAllUserDB,
  getSingleUserDB,
  deleteUserDB,
  updateUserDB,
  createOrderDB,
};
