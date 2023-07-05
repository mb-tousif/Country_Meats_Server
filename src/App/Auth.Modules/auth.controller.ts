import { RequestHandler } from "express";
import AsyncHandler from "../../Utilities/asyncHandler";
import ServerAPIError from "../Error/serverAPIError";
import ResponseHandler from "../../Utilities/responseHandler";
import httpStatus from "http-status";
import { TUser } from "../User.Modules/user.interfaces";
import { createAuthService, loginAuthService } from "./auth.services";
import Config from "../../Config";
import { TLoginResponse } from "../Constants/jwt.constants.interface";

export const createUser: RequestHandler = AsyncHandler(
    async (req, res, next) => {
      const userInfo = req.body;
      const result = await createAuthService(userInfo);
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

  export const loginAuth: RequestHandler = AsyncHandler(
    async (req, res, next) => {
      const loginInfo = req.body;
      const result = await loginAuthService(loginInfo);
      const { refreshToken, ...others } = result;
  
    // set refresh token into cookie
    const cookieOptions = {
      secure: Config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
      ResponseHandler<TLoginResponse>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User login successfully 🎉",
        data: others,
      });
    }
  );