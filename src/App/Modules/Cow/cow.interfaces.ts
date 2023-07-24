import mongoose from "mongoose";
import { ECategory } from "../../Constants/common";

export type TCow = {
  name: string;
  age: number;
  price: number;
  img?: string;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: ECategory;
  seller: mongoose.Types.ObjectId;
};

export type CowModel = mongoose.Model<TCow, Record<string, unknown>>;