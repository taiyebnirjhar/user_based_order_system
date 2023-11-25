import { model } from "mongoose";
import IUser from "./user.interface";
import userSchema from "./user.schema";

export const UserModel = model<IUser>("Users", userSchema);
