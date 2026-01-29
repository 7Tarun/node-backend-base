import { NextFunction } from "express";
import { Request } from "../utilities/Router/request";
import { Response } from "../utilities/Router/response";


export const manageRelationship = (
  req: Request,
  res: Response,
  next: NextFunction,
  relations: string[],
) => {
  req.relation = relations;
  next();
};

// export class RelationController {
//   manageRelationship(req: Request, res: Response, next: NextFunction) {
//     req.relation = ["country", "state", "city"];
//     next();
//   }
// }
