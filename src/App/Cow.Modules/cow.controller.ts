import { RequestHandler } from "express";
import { TCow } from "./cow.interfaces";
import httpStatus from "http-status";
import {
  createCowService,
  deleteCowByIdService,
  getAllCowService,
  getCowByIdService,
  updateCowByIdService,
} from "./cow.services";
import AsyncHandler from "../../Utilities/asyncHandler";
import ServerAPIError from "../Error/serverAPIError";
import ResponseHandler from "../../Utilities/responseHandler";
import { cowSearchQueryFields, paginationFields } from "../Constants/paginationConstants";
import PaginationQueryHandler from "../../Utilities/paginationQueryHandler";

export const createCow: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const cowInfo = req.body;
    const result = await createCowService(cowInfo);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.BAD_REQUEST, "Cow not created 💥")
      );
    }
    ResponseHandler<TCow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow created successfully 🎉",
      data: result,
    });
  }
);

export const updateCowById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const cowInfo = req.body;
    const result = await updateCowByIdService(id, cowInfo);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Cow not found 💥")
      );
    }
    ResponseHandler<TCow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow updated successfully 🎉",
      data: result,
    });
  }
);

export const getAllCows: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const searchQuery =  PaginationQueryHandler(req.query, cowSearchQueryFields);
    const paginationOptions = PaginationQueryHandler(req.query, paginationFields);
    const result = await getAllCowService( paginationOptions, searchQuery);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.BAD_REQUEST, "Cows data not found 💥")
      );
    }
    ResponseHandler<TCow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow found successfully 🎉",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const deleteCowById: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await deleteCowByIdService(id);
    if (!result) {
      return next(
        new ServerAPIError(false, httpStatus.NOT_FOUND, "Cow not found 💥")
      );
    }
    ResponseHandler<TCow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow deleted successfully 🎉",
      data: result,
    });
  }
);

export const getCowById: RequestHandler = AsyncHandler(
    async (req, res, next) => {
        const id = req.params.id;
        const result = await getCowByIdService(id);
        if (!result) {
            return next(
            new ServerAPIError(false, httpStatus.NOT_FOUND, "Cow not found 💥")
            );
        }
        ResponseHandler<TCow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Cow found successfully 🎉",
            data: result,
        });
        }
    );