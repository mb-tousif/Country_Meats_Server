import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interfaces";
import ServerAPIError from "../Error/serverAPIError";

const userSchema = new Schema<TUser>({
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ["seller", "buyer", "admin"],
    default: "buyer",
  },
  address: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
}
);

userSchema.pre<TUser>("save", function (next) {
  if (this.role === "buyer" && (this.budget as number) <= 0) {
    next(new ServerAPIError(false, 400, "Budget must be greater than 0"));
  }
  if (this.role === "buyer" && this.income) {
    next(new ServerAPIError(false, 400, "As a buyer you can't have an income"));
  }
  if (this.role === "seller" && this.budget) {
    next(new ServerAPIError(false, 400, "As a seller you can't have a budget"));
  }
  next();
});

export const User = model<TUser, UserModel>("User", userSchema);