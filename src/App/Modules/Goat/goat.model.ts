import { Schema } from "mongoose";
import { ECategory, ELabel } from "../../Constants/common";
import { model } from "mongoose";
import { GoatModel, TGoat } from "./goat.interfaces";

const goatSchema = new Schema<TGoat>(
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
    img: {
      type: String,
      default: "https://img.freepik.com/free-vector/realistic-summer-landscape-with-cute-white-goat-goatling-green-meadow-background-with-mountains-blue-sky-vector-illustration_1284-74081.jpg",
    },
    price: {
      type: Number,
      required: true,
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

export const Goat = model<TGoat, GoatModel>("Goat", goatSchema);
