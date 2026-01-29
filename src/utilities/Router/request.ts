import { Request as RequestType, Response as ResponseType } from "express";

export interface IUKnownObject {
  [key: string]: any;
}

export interface Request extends RequestType {
  currentData?: IUKnownObject;
  currentResponseError?: IUKnownObject | unknown;
  relation?: IUKnownObject;
  where?: IUKnownObject | string;
}
