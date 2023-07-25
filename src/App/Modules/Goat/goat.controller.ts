import { RequestHandler } from "express";
import httpStatus from "http-status";
import AsyncHandler from "../../../Utilities/asyncHandler";
import ServerAPIError from "../../Error/serverAPIError";
import ResponseHandler from "../../../Utilities/responseHandler";
import {
  searchQueryFields,
  paginationFields,
} from "../../Constants/paginationConstants";
import PaginationQueryHandler from "../../../Utilities/paginationQueryHandler";
import { TGoat } from "./goat.interfaces";
import {
  createGoatService,
  deleteGoatByIdService,
  getAllGoatService,
  getGoatByIdService,
  updateGoatByIdService,
} from "./goat.services";
import Config from "../../../Config";
import { verifyToken } from "../../../Utilities/jwtHandler";

export const createGoat: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const goatInfo = req.body;
    const token = req.headers.authorization as string;
    const verifiedToken = verifyToken(token, Config.jwt.secret as string);
    if (!verifiedToken) {
      return next(
        new ServerAPIError(false, httpStatus.UNAUTHORIZED, "Token not found 💥")
      );
    }
    const { _id } = verifiedToken;
    goatInfo.seller = _id;
    const result = await createGoatService(goatInfo);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.BAD_REQUEST, "Goat not created 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Goat created successfully 🎉",
      data: result,
    });
  }
);

export const updateGoatById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const GoatInfo = req.body;
    const result = await updateGoatByIdService(id, GoatInfo);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Goat not found 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Goat updated successfully 🎉",
      data: result,
    });
  }
);

export const getAllGoats: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const searchQuery = PaginationQueryHandler(req.query, searchQueryFields);
    const paginationOptions = PaginationQueryHandler(
      req.query,
      paginationFields
    );
    const result = await getAllGoatService(paginationOptions, searchQuery);
    if (!result) {
      return next(
        new ServerAPIError(
          false,
          httpStatus.BAD_REQUEST,
          "Goats data not found 💥"
        )
      );
    }
    ResponseHandler<TGoat[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Goat found successfully 🎉",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const deleteGoatById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await deleteGoatByIdService(id);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Goat not found 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Goat deleted successfully 🎉",
      data: result,
    });
  }
);

export const getGoatById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await getGoatByIdService(id);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Goat not found 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Goat found successfully 🎉",
      data: result,
    });
  }
);
