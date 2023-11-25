import { Document } from "mongoose";

interface IAddress {
  street: string;
  city: string;
  country: string;
}

interface IUserFullName {
  firstName: string;
  lastName: string;
}

interface IUser extends Document {
  userId: string;
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
}

export default IUser;

export { IAddress, IUserFullName };
