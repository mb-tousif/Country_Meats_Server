import { Model } from "mongoose";
import { TAdminRoles } from "../Constants/admin.constants";

export type TAdmin = {
  id: string;
  phoneNumber: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: TAdminRoles;
  address: string;
};

// export type AdminModel = Model<TAdmin, Record<string, unknown>>;
export type AdminModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TAdmin>;