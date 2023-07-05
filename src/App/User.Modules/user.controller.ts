import { RequestHandler } from "express";
import { deleteUserByIdService, getAllUserByIdService, getAllUserService, updateUserByIdService } from "./user.services";
import httpStatus from "http-status";
import { TUser } from "./user.interfaces";
import AsyncHandler from "../../Utilities/asyncHandler";
import ServerAPIError from "../Error/serverAPIError";
import ResponseHandler from "../../Utilities/responseHandler";

export const updateUserById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const userInfo = req.body;
    const result = await updateUserByIdService(id, userInfo); 
    if (!result) {
      return next( new ServerAPIError(false, httpStatus.NOT_FOUND, "User not found 💥"));
    }
    ResponseHandler<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully 🎉",
      data: result,
    });
  });

export const deleteUserById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await deleteUserByIdService(id);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "User not found 💥")
      );
    }
    ResponseHandler<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully 🎉",
      data: result,
    });
  }
);

export const getAllUsers: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const result = await getAllUserService();
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Users not Found 💥")
      );
    }
    ResponseHandler<TUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully 🎉",
      data: result,
    });
  }
);

export const getUserById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await getAllUserByIdService(id);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "User not Found 💥")
      );
    }
    ResponseHandler<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully 🎉",
      data: result,
    });
  }
);
