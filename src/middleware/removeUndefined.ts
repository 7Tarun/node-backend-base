import { NextFunction } from "express";
import { Request } from "../utilities/Router/request";
import { Response } from "../utilities/Router/response";

export const removeUndefined = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { query } = req;
  Object.keys(query).forEach((key) => {
    if (query[key] == "undefined") delete query[key];
  });
  next();
};
