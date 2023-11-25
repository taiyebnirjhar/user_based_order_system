import IUser from "./user.interface";
import { UserModel } from "./user.model";

const createUserDB = async (user: IUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserDB = async (id: string) => {
  const result = await UserModel.findOne({ id });
  return result;
};

export const UserServices = {
  createUserDB,
  getAllUserDB,
  getSingleUserDB,
};
