import { Document, Model } from "mongoose";

interface IUserFullName {
  firstName: string;
  lastName: string;
}
interface IAddress {
  street: string;
  city: string;
  country: string;
}

interface IOrders {
  productName: string;
  price: number;
  quantity: number;
}

interface IUser extends Document {
  userId: number;
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrders[];
}

interface ExtendedUserModel extends Model<IUser> {
  isUserExists(userId: number): Promise<IUser | null>;
}

export default IUser;

export { ExtendedUserModel, IAddress, IUserFullName };
