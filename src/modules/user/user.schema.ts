import { Schema } from "mongoose";
import IUser, {
  ExtendedUserModel,
  IAddress,
  IUserFullName,
} from "./user.interface";
import { UserModel } from "./user.model";

const fullNameSchema = new Schema<IUserFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<IUser, ExtendedUserModel>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: addressSchema,
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export default userSchema;

export { addressSchema, fullNameSchema };
