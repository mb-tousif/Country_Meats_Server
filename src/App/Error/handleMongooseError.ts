import mongoose from "mongoose";
import { IGenericErrorMessage, IGenericErrorResponse } from "./interfaceError";
import httpStatus from "http-status";

const HandleMongooseError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    success: false,
    statusCode: httpStatus.UNPROCESSABLE_ENTITY,
    message: "Mongoose Validation Error",
    errorMessages: errors,
  };
};

export default HandleMongooseError;
