// docs/test/routes/test.ts
import { getSuccessResponse } from "../../common/schema/response";

export const GetTestAPI = {
  get: {
    tags: ["Test API"],
    summary: "Get Test list",
    description: "This API is used to fetch all test records",
    operationId: "GetTests",
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: getSuccessResponse(
              "#/components/schema/test_response",
            ),
          },
        },
      },
    },
  },

  post: {
    tags: ["Test API"],
    summary: "Create Test",
    description: "This API is used to create a test record",
    operationId: "CreateTest",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schema/test_request" },
        },
      },
    },
    responses: {
      201: {
        description: "Created",
        content: {
          "application/json": {
            schema: getSuccessResponse(
              "#/components/schema/test_response",
            ),
          },
        },
      },
    },
  },
};
