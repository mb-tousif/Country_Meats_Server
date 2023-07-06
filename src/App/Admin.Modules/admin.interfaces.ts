import { Model } from "mongoose";

export type TAdmin = {
  id: string;
  phoneNumber: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: string;
  address: string;
};

// export type AdminModel = Model<TAdmin, Record<string, unknown>>;
export type AdminModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TAdmin>;