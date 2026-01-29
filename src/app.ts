import cors from "cors";
import express, { Application } from "express";
import celebrateErrors from "./middleware/celebrateErrors";
import { httpCode } from "./constants/httpCodes";
import { BaseRoutes } from "./api/base.router";
import swaggerUI from "swagger-ui-express";
import multer from "multer";
import docsV1 from "./docsV1";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { APP_PORT, SERVICE_NAME } = process.env;
const mainRouter = new BaseRoutes();


export function createApp(): Application {
  const app: Application = express();
  app.set('trust proxy', 1);  //newly added
  //ignoring the favicon api call requested from browser
  app.get("/favicon.ico", (req, res) => res.status(204));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(upload.fields([{ name: "files" }, { name: "ftp_path" }]));
  app.use(function (req, res, next) {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    var method = req.method;
    var url = req.url;
    if (method == "GET") {
      console.log(`. IP - ${ip} - ${method} - ${url}`);
    } else {
      console.log(
        `. IP - ${ip} - ${method} - ${url} ::: Payload - ${JSON.stringify(req.body)}`,
      );
    }
    next();
  });

  app.use(`/${SERVICE_NAME}/`, mainRouter.getApi());

  // Serve the Swagger JSON file
  app.get("/api-docs/v1/json", (req, res) => {
    res.json(docsV1);
  });
  app.use(
    "/api-docs/v1",
    swaggerUI.serveFiles(docsV1),
    swaggerUI.setup(docsV1)
  );

  app.use(celebrateErrors());
  app.use((req, res) => {
    return res.status(httpCode.BAD_REQUEST).json({
      status: httpCode.BAD_REQUEST,
      message: `Please contact ${process.env.APP_NAME} team for API docs`,
    });
  });

  return app;
}

export function startServer(): void {
  const port = APP_PORT || 5000;
  const app = createApp();

  app
  .listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        console.error(`----- Port ${port} is busy -----`);
    } else {
        console.error(`Error while running the server in Port ${port}`, err);
    }
  });
}








// export async function startServer(): Promise<void> {
//   const port = APP_PORT || 5000;

//   const app: Application = express();
//   //ignoring the favicon api call requested from browser
//   app.get("/favicon.ico", (req, res) => res.status(204));
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cors());
//   app.use(upload.fields([{ name: "files" }, { name: "ftp_path" }]));
//   app.use(function (req, res, next) {
//     var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//     var method = req.method;
//     var url = req.url;
//     if (method == "GET") {
//       console.log(`. IP - ${ip} - ${method} - ${url}`);
//     } else {
//       console.log(
//         `. IP - ${ip} - ${method} - ${url} ::: Payload - ${JSON.stringify(req.body)}`,
//       );
//     }
//     next();
//   });

//   app.use(`/${SERVICE_NAME}/`, mainRouter.getApi());

//   // Serve the Swagger JSON file
//   app.get("/api-docs/v1/json", (req, res) => {
//     res.json(docsV1);
//   });
//   app.use(
//     "/api-docs/v1",
//     swaggerUI.serveFiles(docsV1),
//     swaggerUI.setup(docsV1),
//   );

//   app.use(celebrateErrors());
//   app.use((req, res) => {
//     return res.status(httpCode.BAD_REQUEST).json({
//       status: httpCode.BAD_REQUEST,
//       message: `Please contact ${process.env.APP_NAME} team for API docs`,
//     });
//   });
//   app
//     .listen(port, () => {
//       console.log(`Server is running at http://localhost:${port}`);
//     })
//     .on("error", (err: any) => {
//       if (err.code === "EADDRINUSE") {
//         console.error(`----- Port ${port} is busy -----`);
//       } else {
//         console.error(`Error while running the server in Port ${port}`, err);
//       }
//     });
// }
