import { Schema, model } from "mongoose";
import { AdminModel, TAdmin } from "./admin.interfaces";
import bcrypt from "bcrypt";
import config from "../../Config";

const adminSchema = new Schema<TAdmin>({
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
        type: [String],
        enum: ["admin"],
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
  );

  adminSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password, config.jwt.saltRounds);
    this.password = hashedPassword;
    next();
  });
  
  adminSchema.methods.comparePassword = function (password:string, hash:string) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
  };
  
  
  export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);