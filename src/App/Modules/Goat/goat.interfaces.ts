import mongoose from "mongoose";
import { ECategory } from "../../Constants/common";

export type TGoat = {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: ECategory;
  seller: mongoose.Types.ObjectId;
};

export type GoatModel = mongoose.Model<TGoat, Record<string, unknown>>;