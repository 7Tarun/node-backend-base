import { Router } from "express";

import { removeUndefined } from "../../middleware/removeUndefined";
import { httpCode } from "../../constants/httpCodes";
import { TestRoute } from "./test/test.router";


export class V1Routes {
  private router: Router = Router();
  private testRouter: TestRoute;


  constructor() {
    this.routes();

    this.testRouter = new TestRoute();
  }

  /**
   * @return The api routes here
   */
  public getV1Api(): Router {
    this.router.use(removeUndefined);
    this.router.use("/test", this.testRouter.router);

    return this.router;
  }

  /**
   * Define index routes here bellow
   */
  private routes(): void {
    // Service healthy check route
    this.router.use("/_health", (req, res) => {
      return res.sendStatus(httpCode.OK);
    });
  }
}
