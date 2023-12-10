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
    // Transform the Mongoose document to a plain JavaScript object
    const userObject = result.toObject();

    // Exclude _id fields within nested objects
    userObject.fullName = {
      firstName: userObject.fullName.firstName,
      lastName: userObject.fullName.lastName,
    };
    userObject.address = {
      street: userObject.address.street,
      city: userObject.address.city,
      country: userObject.address.country,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, password, ...userWithoutIdAndVersion } = userObject;

    return userWithoutIdAndVersion;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUserDB = async () => {
  const result = await UserModel.find().select(
    "-_id username fullName.firstName fullName.lastName age email address.street address.city address.country",
  );

  console.log(result);

  return result;
};

const getSingleUserDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select(
    "-_id userId username fullName.firstName fullName.lastName age email isActive hobbies address.street address.city address.country",
  );

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
    throw new Error(`Error updating user: ${error.message}`);
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
