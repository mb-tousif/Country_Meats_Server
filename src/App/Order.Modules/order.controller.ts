import { RequestHandler } from "express";
import { TOrder } from "./order.interface";
import httpStatus from "http-status";
import { createOrderService, getAllOrdersService } from "./order.services";
import AsyncHandler from "../../Utilities/asyncHandler";
import ServerAPIError from "../Error/serverAPIError";
import ResponseHandler from "../../Utilities/responseHandler";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        user: JwtPayload | null;
      }
    }
  }

export const createOrder: RequestHandler = AsyncHandler (
    async (req, res, next) => {
        const orderInfo = req.body;
        const result = await createOrderService(orderInfo);
        if (!result) {
            return next(
                new ServerAPIError(false, httpStatus.BAD_REQUEST, "Order not created 💥")
            );
        }
        ResponseHandler<TOrder>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Order created successfully 🎉",
            data: result,
        });
    }
);

export const getAllOrders: RequestHandler = AsyncHandler(
    async (req, res, next) => {
        const token = req.headers.authorization;
        const result = await getAllOrdersService(token as string);
        if (!result) {
            return next(
                new ServerAPIError(false, httpStatus.BAD_REQUEST, "Orders not found 💥")
                );
            }
        ResponseHandler<TOrder[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Orders found successfully 🎉",
            data: result,
        });
    }
);
