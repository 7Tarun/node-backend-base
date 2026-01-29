import { Test } from "../../../entities/schema/app/test.entity";
import { BaseController } from "../../base.controller";

export class TestController extends BaseController {
    constructor() {
        super(Test, {}, "");
    }
}
