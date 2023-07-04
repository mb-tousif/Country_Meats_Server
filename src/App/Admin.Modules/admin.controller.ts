import { RequestHandler } from "express";
import { createAdminService, loginAdminService } from "./admin.services";
import httpStatus from "http-status";
import ResponseHandler from "../../Utilities/responseHandler";
import { TAdmin } from "./admin.interfaces";
import ServerAPIError from "../../App/Error/serverAPIError";
import AsyncHandler from "../../Utilities/asyncHandler";

export const createAdmin: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const adminInfo = req.body;
    const result = await createAdminService(adminInfo);
    if (!result) {
      return next(
        new ServerAPIError(
          false,
          httpStatus.BAD_REQUEST,
          "Admin not created 💥"
        )
      );
    }
    ResponseHandler<TAdmin>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Admin created successfully 🎉",
      data: result,
    });
  }
);

export const loginAdmin: RequestHandler = AsyncHandler(
    async (req, res, next) => {
        const loginInfo = req.body;
        const result = await loginAdminService(loginInfo.phoneNumber);
        if (!result) {
            return next(
            new ServerAPIError(
                false,
                httpStatus.BAD_REQUEST,
                "Admin not Found 💥"
            )
            );
        }

        ResponseHandler<TAdmin>(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Admin login successfully 🎉",
            data: result,
        });
    }
);
