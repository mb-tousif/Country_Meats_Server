import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interfaces";
import ServerAPIError from "../Error/serverAPIError";
import bcrypt from "bcrypt";
import Config from "../../Config";
import httpStatus from "http-status";

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
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["seller", "buyer"],
    default: "buyer",
  },
  address: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
  },
  income: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
}
);

userSchema.pre<TUser>("save", function (next) {
  if (this.role === "buyer" && (this.budget as number) <= 0) {
    next(new ServerAPIError(false, httpStatus.NOT_FOUND, "Budget must be greater than 0"));
  }
  if (this.role === "buyer" && this.income) {
    next(new ServerAPIError(false, httpStatus.NOT_FOUND, "As a buyer you can't have an income"));
  }
  if (this.role === "seller" && this.budget) {
    next(new ServerAPIError(false, httpStatus.NOT_FOUND, "As a seller you can't have a budget"));
  }
  next();
});

// Hash Password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(Config.jwt.saltRounds)
  );
  this.password = hashedPassword;
  next();
});

// Compare Password
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);