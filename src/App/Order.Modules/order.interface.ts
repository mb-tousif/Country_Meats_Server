import mongoose from "mongoose";
import{ Model, Types } from "mongoose";

export type TOrder = {
    buyer: mongoose.Types.ObjectId;
    cow: mongoose.Types.ObjectId;
    seller?: mongoose.Types.ObjectId;
    quantity?: number;
    totalPayment?: number;
}

export type OrderModel = Model<TOrder, Record<string, unknown>>;