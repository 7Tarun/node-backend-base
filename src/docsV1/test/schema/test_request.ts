export const test_request = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      description: "Test name",
      example: "Sample Test",
    },
    description: {
      type: "string",
      description: "Test description",
      example: "This is a test record",
    },
    isActive: {
      type: "boolean",
      description: "Is test active",
      example: true,
    },
  },
};
