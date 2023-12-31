import mongoose from "mongoose";
import ServerAPIError from "../../Error/serverAPIError";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from "http-status";
import { Cow } from "../Cow/cow.model";
import { User } from "../User/user.model";
import Config from "../../../Config";
import { verifyToken } from "../../../Utilities/jwtHandler";

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
          { $inc: { income: +total } },
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

export const getAllOrdersService = async (token:string) => {
  const userInfo = verifyToken(token, Config.jwt.secret as string);
  const { _id, role } = userInfo;
  const orders = (role !== "admin") ? (await Order.find({ $or: [{ buyer: _id }, { seller: _id }] }).populate("buyer").populate("cow").populate("seller")): (await Order.find().populate("buyer").populate("cow").populate("seller"));
  if (!orders || orders.length === 0 ) {
    throw new ServerAPIError(false, httpStatus.NOT_FOUND, "Orders not found 💥");
  }
  return orders;
};

export const getOrderByIdService = async (token:string, id:string): Promise<TOrder> => {
  const userInfo = verifyToken(token, Config.jwt.secret as string);
  const { _id } = userInfo;
  if (id !== _id) {
    throw new ServerAPIError(false, httpStatus.UNAUTHORIZED, "User id not matched 💥");
  }
  const order = await Order.findOne({ $or: [{ buyer: _id }, { seller: _id }] }).populate("buyer").populate("cow").populate("seller").lean();
  if (!order ) {
    throw new ServerAPIError(false, httpStatus.NOT_FOUND, "Order not found 💥");
  }
  return order;
};
