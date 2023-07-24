import { RequestHandler } from "express";
import httpStatus from "http-status";
import AsyncHandler from "../../../Utilities/asyncHandler";
import ServerAPIError from "../../Error/serverAPIError";
import ResponseHandler from "../../../Utilities/responseHandler";
import { searchQueryFields, paginationFields } from "../../Constants/paginationConstants";
import PaginationQueryHandler from "../../../Utilities/paginationQueryHandler";
import { TGoat } from "./goat.interfaces";
import { createGoatService, deleteGoatByIdService, getAllGoatService, getGoatByIdService, updateGoatByIdService } from "./goat.services";

export const createGoat: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const cowInfo = req.body;
    const result = await createGoatService(cowInfo);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.BAD_REQUEST, "Cow not created 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow created successfully 🎉",
      data: result,
    });
  }
);

export const updateGoatById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const cowInfo = req.body;
    const result = await updateGoatByIdService(id, cowInfo);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Cow not found 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow updated successfully 🎉",
      data: result,
    });
  }
);

export const getAllGoats: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const searchQuery =  PaginationQueryHandler(req.query, searchQueryFields);
    const paginationOptions = PaginationQueryHandler(req.query, paginationFields);
    const result = await getAllGoatService( paginationOptions, searchQuery);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.BAD_REQUEST, "Cows data not found 💥")
      );
    }
    ResponseHandler<TGoat[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow found successfully 🎉",
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
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Cow not found 💥")
      );
    }
    ResponseHandler<TGoat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow deleted successfully 🎉",
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
            new ServerAPIError(false, httpStatus.NOT_FOUND, "Cow not found 💥")
            );
        }
        ResponseHandler<TGoat>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Cow found successfully 🎉",
            data: result,
        });
        }
    );