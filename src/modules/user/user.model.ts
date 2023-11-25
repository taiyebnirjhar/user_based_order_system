import { model } from "mongoose";
import IUser, { ExtendedUserModel } from "./user.interface";
import userSchema from "./user.schema";

export const UserModel = model<IUser, ExtendedUserModel>("User", userSchema);
