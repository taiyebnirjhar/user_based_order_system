import IUser from "./user.interface";
import { UserModel } from "./user.model";

const createUserDB = async (user: IUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserDB,
};
