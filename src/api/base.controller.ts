import { NextFunction } from "express";
import { responseWrapper } from "../helpers/responseWrapper";
import { IUKnownObject, Request } from "../utilities/Router/request";
import { Response } from "../utilities/Router/response";
import { BaseService } from "./base.service";

interface ControllerProps {
  model: any;
  modelProps?: IUKnownObject; // populate properties, ...
  paramsLabel?: string;
}

export class BaseController extends BaseService {
  model: any;
  modelProps?: IUKnownObject; // populate properties, ...
  paramsLabel?: string;

  constructor(model: any, modelProps?: IUKnownObject, paramsLabel?: string) {
    super(model, modelProps, paramsLabel);
    this.model = model;
    this.modelProps = modelProps;
    this.paramsLabel = paramsLabel;
  }
  public async createMany(req: Request, res: Response, next: NextFunction) {
    try {
      let result: any = await super.createManyFn(req);
      responseWrapper({ res, ...result });
    } catch (error: any) {
      console.log(error);
      responseWrapper({ res, ...error });
    }
  }

  public async getMany(req: Request, res: Response, next: NextFunction) {
    try {
      let result: any = await super.getManyFn(req);
      responseWrapper({ res, ...result });
    } catch (error: any) {
      responseWrapper({ res, ...error });
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      let result: any = await super.getOneFn(req);
      responseWrapper({ res, ...result });
    } catch (error: any) {
      responseWrapper({ res, ...error });
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      let result: any = await super.updateFn(req);
      responseWrapper({ res, ...result });
    } catch (error: any) {
      console.log(error);
      responseWrapper({ res, ...error });
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      let result: any = await super.deleteFn(req);
      responseWrapper({ res, ...result });
    } catch (error: any) {
      responseWrapper({ res, ...error });
    }
  }
  public async deleteMany(req: Request, res: Response, next: NextFunction) {
    try {
      let result: any = await super.deleteManyFn(req);
      responseWrapper({ res, ...result });
    } catch (error: any) {
      responseWrapper({ res, ...error });
    }
  }
}
