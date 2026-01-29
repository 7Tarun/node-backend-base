import { test_request } from "./test_request";
import { test_response } from "./test_response";

let schema: any = {};

schema["test_request"] = test_request;
schema["test_response"] = test_response;

export const testSchema = schema;
