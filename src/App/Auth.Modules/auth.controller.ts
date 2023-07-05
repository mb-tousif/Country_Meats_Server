import { RequestHandler } from "express";
import AsyncHandler from "../../Utilities/asyncHandler";
import ServerAPIError from "../Error/serverAPIError";
import ResponseHandler from "../../Utilities/responseHandler";
import httpStatus from "http-status";
import { TUser } from "../User.Modules/user.interfaces";
import { createUserService } from "../User.Modules/user.services";

export const createUser: RequestHandler = AsyncHandler(
    async (req, res, next) => {
      const userInfo = req.body;
      const result = await createUserService(userInfo);
      if (!result) {
        return next(
          new ServerAPIError(false, httpStatus.BAD_REQUEST, "User not created 💥")
        );
      }
      ResponseHandler<TUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully 🎉",
        data: result,
      });
    }
  );