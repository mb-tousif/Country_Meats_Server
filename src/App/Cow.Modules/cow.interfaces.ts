import mongoose from "mongoose";
import { ECcategory, ELocation } from "../Constants/cowConstants";

export type TCow = {
  name: string;
  age: number;
  price: number;
  location: ELocation;
  breed: string;
  weight: number;
  label: string;
  category: ECcategory;
  seller: mongoose.Types.ObjectId;
};

export type CowModel = mongoose.Model<TCow, Record<string, unknown>>;