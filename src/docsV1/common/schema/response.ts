// const SuccessResponse = {
//   type: "object", // data type
//   properties: {
//     status: {
//       type: "number", // data-type
//       description: "Status code of the API", // desc
//       example: "200", // example of an id
//     },
//     message: {
//       type: "string", // data-type
//       description: "Message of the API", // desc
//       example: "Success", // example of a title
//     },
//     data: {
//       type: "object", // data-type
//       description: "Response data", // desc
//       example:"[]", // example of a title
//       items: { $ref: "" },
//     },
//     page: {
//       type: "number", // data-type
//       description: "Page number", // desc
//       example: 0, // example of a title
//     },
//     per_page: {
//       type: "number", // data-type
//       description: "No of items per page", // desc
//       example: 10, // example of a title
//     },
//     total: {
//       type: "number", // data-type
//       description: "Total number of records", // desc
//       example: 100, // example of a title
//     },
//   },
// };

// // Define the type for SuccessResponse to include optional example
// type SuccessResponseType = {
//     type: string;
//     properties: {
//       status: { type: string; description: string; example: number };
//       message: { type: string; description: string; example: string };
//       data: {
//         type: string;
//         description: string;
//         example?: any; // Make `example` optional
//         properties: object;
//         items: { $ref: string };
//       };
//       page: { type: string; description: string; example: number };
//       per_page: { type: string; description: string; example: number };
//       total: { type: string; description: string; example: number };
//     };
//   };

// export function getSuccessResponse(schema?: any) {
//   if (schema) {
//     SuccessResponse.properties.data.items.$ref = schema;
//      delete SuccessResponse.properties.data.example;
//   } else {
//     SuccessResponse.properties.data.example = "[]";
//   }
//   return SuccessResponse;
// }

const SuccessResponse = {
  type: "object", // data type
  properties: {
    status: {
      type: "number", // data-type
      description: "Status code of the API", // desc
      example: 200, // example of a status code
    },
    message: {
      type: "string", // data-type
      description: "Message of the API", // desc
      example: "Success", // example of a message
    },
    data: {
      type: "object", // data-type
      description: "Response data", // desc
      example: {}, // default example for data
      properties: {}, // Placeholder for schema properties
      items: { $ref: "" }, // Placeholder for schema reference
    },
    page: {
      type: "number", // data-type
      description: "Page number", // desc
      example: 0, // example of a page number
    },
    per_page: {
      type: "number", // data-type
      description: "Number of items per page", // desc
      example: 10, // example of items per page
    },
    total: {
      type: "number", // data-type
      description: "Total number of records", // desc
      example: 100, // example of total records
    },
  },
};

// Define the type for SuccessResponse to include optional example
type SuccessResponseType = {
  type: string;
  properties: {
    status: { type: string; description: string; example: number };
    message: { type: string; description: string; example: string };
    data: {
      type: string;
      description: string;
      example?: any; // Make `example` optional
      properties: object;
      items: { $ref: {} };
    };
    page: { type: string; description: string; example: number };
    per_page: { type: string; description: string; example: number };
    total: { type: string; description: string; example: number };
  };
};

// Cast the constant to the type
const SuccessResponseTyped: SuccessResponseType =
  SuccessResponse as SuccessResponseType;

export function getSuccessResponse(schema?: any) {
  if (schema) {
    // Apply schema reference to `data`
    SuccessResponseTyped.properties.data.items.$ref = schema;

    // Delete the `example` property safely (now optional)
    delete SuccessResponseTyped.properties.data.example;
  } else {
    // Set example data if no schema is provided
    SuccessResponseTyped.properties.data.example = [];
    // console.log(SuccessResponseTyped.properties.data.example);
  }

  return SuccessResponseTyped;
}
