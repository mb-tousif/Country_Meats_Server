import { Model } from "mongoose";
import { TUserRoles } from "../Constants/userConstants";

export type TUser = {
  id: string;
  phoneNumber: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: TUserRoles;
  address: string;
  budget?: number;
  income?: number;
};

// export type UserModel = Model<TUser, Record<string, unknown>>;
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;