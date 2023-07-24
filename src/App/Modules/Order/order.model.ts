import { Schema, model } from "mongoose";
import { OrderModel, TOrder } from "./order.interface";
import { Cow } from "../Cow/cow.model";
import { Goat } from "../Goat/goat.model";

const orderSchema = new Schema<TOrder>({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cow: {
        type: Schema.Types.ObjectId,
        ref: "Cow",
    },
    goat: {
        type: Schema.Types.ObjectId,
        ref: "Goat",
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
    toJSON: {
        virtuals: true,
      },
});

orderSchema.pre<TOrder>("save", async function (next) {
    if (this.buyer && this.cow) {
        const sellerId = await Cow.findById(this.cow).select("seller");
        this.seller = sellerId?.seller;
    }else if(this.buyer && this.goat){
        const sellerId = await Goat.findById(this.goat).select("seller");
        this.seller = sellerId?.seller;
    }
    next();
});

export const Order = model<TOrder, OrderModel>("Order", orderSchema);