import { Router } from "express";
import { TestController } from "./test.controller";
import { createTest } from "./test.validation";

export class TestRoute {
    private _router: Router = Router();
    private readonly testController: TestController;

    constructor() {
        this.testController = new TestController();
        this.routes();
    }

    public get router(): Router {
        return this._router;
    }

    private routes(): void {
        this._router.get(
            "/",
            this.testController.getMany.bind(this.testController),
        );

        this._router.post(
            "/",
            createTest,
            this.testController.createMany.bind(this.testController),
        );
    }
}
