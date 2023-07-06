import { Schema, model } from "mongoose";
import { AdminModel, TAdmin } from "./admin.interfaces";
import bcrypt from "bcrypt";
import config from "../../Config";

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
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
      enum: ["admin"],
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash Password
adminSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(config.jwt.saltRounds)
  );
  this.password = hashedPassword;
  next();
});

// Compare Password
adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
