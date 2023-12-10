import bcrypt from "bcrypt";
import { Schema } from "mongoose";
import config from "../../config";
import IUser, {
  ExtendedUserModel,
  IAddress,
  IUserFullName,
} from "./user.interface";
import { UserModel } from "./user.model";

const fullNameSchema = new Schema<IUserFullName>({
  firstName: {
    type: String,
    required: [true, "First name is required."],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: [true, "Street is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  country: {
    type: String,
    required: [true, "Country is required."],
  },
});

const userSchema = new Schema<IUser, ExtendedUserModel>({
  userId: {
    type: Number,
    required: [true, "User ID is required."],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, "Age is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email format.",
    },
  },
  isActive: {
    type: Boolean,
    required: [true, "isActive is required."],
  },
  hobbies: {
    type: [String],
    required: [true, "Hobbies are required."],
  },
  address: addressSchema,
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  console.log(this);
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  delete doc.password;

  next();
});

userSchema.pre("updateOne", async function (next) {
  const updates = this.getUpdate();
  const update = updates[0].$set;

  const newPassword = update.password;

  if (newPassword) {
    update.password = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

userSchema.post("updateOne", function (doc, next) {
  delete doc.password;
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export default userSchema;

export { addressSchema, fullNameSchema };
