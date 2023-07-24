import { Schema } from "mongoose";
import { CowModel, TCow } from "./cow.interfaces";
import { ECategory, ELabel } from "../../Constants/common";
import { model } from "mongoose";

const cowSchema = new Schema<TCow>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      default: "https://img.freepik.com/free-vector/eid-al-adha-celebration-illustration_23-2148971420.jpg",
    },
    location: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ELabel,
      default: ELabel.forSale,
    },
    category: {
      type: String,
      enum: ECategory,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

export const Cow = model<TCow, CowModel>("Cow", cowSchema);
