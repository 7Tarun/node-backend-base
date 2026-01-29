let schema: any = {};
import { getSuccessResponse } from "./response";
schema["response"] = getSuccessResponse();
export const commonResponse = schema;
