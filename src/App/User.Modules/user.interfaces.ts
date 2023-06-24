import { Model } from "mongoose";
import { TUserRoles } from "../Constants/userConstants";

export type TUser = {
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

export type UserModel = Model<TUser, Record<string, unknown>>;