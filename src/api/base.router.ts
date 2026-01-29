import { Router } from "express";
import { V1Routes } from "./v1/v1.router";

export class BaseRoutes {
  private router: Router = Router();
  private v1Routes: V1Routes = new V1Routes();

  constructor() {}

  /**
   * @return The api routes here
   */

  public getApi(): Router {
    this.router.use("/api/v1", this.v1Routes.getV1Api());
    return this.router;
  }
}
