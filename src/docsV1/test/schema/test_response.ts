export const test_response = {
  type: "object",
  properties: {
    id: {
      type: "number",
      example: 1,
    },
    name: {
      type: "string",
      example: "Sample Test",
    },
    description: {
      type: "string",
      example: "This is a test record",
    },
    isActive: {
      type: "boolean",
      example: true,
    },
    createdAt: {
      type: "string",
      example: "2024-01-01T10:00:00.000Z",
    },
    updatedAt: {
      type: "string",
      example: "2024-01-01T10:00:00.000Z",
    },
  },
};
