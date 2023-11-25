import IUser from "./user.interface";
import { UserModel } from "./user.model";
import userValidationSchema from "./user.validation";

const createUserDB = async (user: IUser) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error("User already exists!");
  }
  const validationZod = userValidationSchema.parse(user);

  const result = await UserModel.create(validationZod);
  return result;
};

const getAllUserDB = async () => {
  const result = await UserModel.find();

  return result;
};

const getSingleUserDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });

  return result;
};

export const UserServices = {
  createUserDB,
  getAllUserDB,
  getSingleUserDB,
};
