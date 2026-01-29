// src/index.ts
require("./env-config");
import { createApp, startServer } from "./app";
import { startCluster } from "./cluster";
import { Initialize } from "./database/connect";
import { customConsole } from "./utilities/console";
import serverlessExpress from '@vendia/serverless-express';
//For env File

const isClusterEnabled = process.env.CLUSTER === "true";
const isELKEnabled = process.env.ELK === "true";
const isHeadless = process.env.isHeadless === "true"


let serverlessHandler: any;

(async () => {
  if (isELKEnabled) customConsole();
  await Initialize();

  if (!isClusterEnabled) {
    if (!isHeadless) {
      startServer();
    } else {
      const app = createApp();
      serverlessHandler = serverlessExpress({ app });
    }
  } else {
    startCluster();
  }
})();

export const handler = (event: any, context: any) => {
  return serverlessHandler(event, context);
};
