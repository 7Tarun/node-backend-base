import { commonResponse } from "./common/schema";
import { testSchema } from "./test/schema";



export const components = {
  components: {
    schema: {
      ...commonResponse,
      ...testSchema,
    },
  },
};
