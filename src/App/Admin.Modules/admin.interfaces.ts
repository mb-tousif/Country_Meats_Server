import { Model } from "mongoose";
import { TAdminRoles } from "../Constants/admin.constants";

export type TAdmin = {
  phoneNumber: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: TAdminRoles;
  address: string;
};

export type AdminModel = Model<TAdmin, Record<string, unknown>>;