import { Schema, model } from "mongoose";
import { OrderModel, TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cow: {
        type: Schema.Types.ObjectId,
        ref: "Cow",
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
    },
    totalPayment: {
        type: Number,
    },
},
{
    timestamps: true,
});

export const Order = model<TOrder, OrderModel>("Order", orderSchema);