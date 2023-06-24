import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage, IGenericErrorResponse } from "./interfaceError";
import httpStatus from "http-status";

const HandleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message: "Zod Validation Error",
    errorMessages: errors,
  };
};

export default HandleZodError;
