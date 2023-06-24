import mongoose from "mongoose";
import { Cow } from "../Cow.Modules/cow.model";
import ServerAPIError from "../Error/serverAPIError";
import { User } from "../User.Modules/user.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from "http-status";

export const createOrderService = async (orderInfo: TOrder) => {
  const { buyer, cow, quantity = 1 } = orderInfo;
//   extra validation
  const cowLabel = await Cow.findById(cow).select("label");
    if (cowLabel?.label === "sold out") {
    throw new ServerAPIError( false, httpStatus.CONFLICT, "Cow is already sold out 💥");
    }
  const cowPrice = await Cow.findById(cow).select("price");
  const buyerBalance = await User.findById(buyer).select("budget");
  if (buyerBalance?.budget && cowPrice?.price) {
    if (buyerBalance.budget >= cowPrice.price * quantity) {
      const total: number = cowPrice.price * quantity;
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        await Cow.findByIdAndUpdate(cow, { label: "sold out" }, { session });
        await User.findByIdAndUpdate(
          buyer,
          { budget: buyerBalance.budget - total },
          { session }
        );
        const sellerId = await Cow.findById(cow).select("seller");
        await User.findByIdAndUpdate(
          sellerId?.seller,
          { income: +total },
          { session }
        );
        orderInfo.totalPayment = total;
        const order = await Order.create(orderInfo);
        await session.commitTransaction();
        await session.endSession();
        return order;
      } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
      }
    } else {
      throw new ServerAPIError(
        false,
        httpStatus.BAD_REQUEST,
        "Not enough balance 💥"
      );
    }
  }
};

export const getAllOrdersService = async () => {
  const orders = await Order.find()
//   const orders = await Order.find().populate("buyer").populate("cow");
  return orders;
};
