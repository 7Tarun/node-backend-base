import { GetTestAPI } from "./routes/getTest";
import { PostTestAPI } from "./routes/postTest";

export const test = {
  "/test": {
    ...GetTestAPI,
    ...PostTestAPI
  },
};
