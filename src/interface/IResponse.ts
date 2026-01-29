import { IUKnownObject } from "../utilities/Router/request";
import { Response } from "express";

export interface IResponse {
  res: Response;
  status: number;
  message: string;
  data?: IUKnownObject | IUKnownObject[];
  errors?: IUKnownObject;
  page?: number;
  per_page?: number;
  total?: number;
}
