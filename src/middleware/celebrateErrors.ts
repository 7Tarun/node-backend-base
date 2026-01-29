import { CelebrateError, isCelebrateError } from "celebrate";
import { Request, Response, NextFunction, query } from "express";
import { responseWrapper } from "../helpers/responseWrapper";
import { httpCode } from "../constants/httpCodes";
interface LooseObject {
  [key: string]: any;
}
export default () =>
  (error: CelebrateError, req: Request, res: Response, next: NextFunction) => {
    if (!isCelebrateError(error)) return next(error);
    let errorMessages: LooseObject = {
      params: {},
      body: {},
      query: {},
      headers: {},
    };
    Object.keys(errorMessages).forEach((key) => {
      error.details.get(key)?.details.forEach((err) => {
        errorMessages[key][err.context?.key || ""] = err?.message;
      });
    });
    // error.details.get("body")?.details.forEach((err) => {
    //   errorMessages[err.context?.key || ""] = err?.message;
    // });

    Object.keys(errorMessages).forEach((key) => {
      if (Object.keys(errorMessages[key]).length <= 0) {
        delete errorMessages[key];
      }
    });

    //default response for v1.1
    return responseWrapper({
      res,
      status: httpCode.BAD_REQUEST,
      message: error.message,
      data: undefined,
      errors: errorMessages,
    });
  };
