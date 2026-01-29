require("dotenv").config();
let result: any;

switch (process.env.MODE) {
  case "local":
    setEnvironment("./environments/.env.local");
    break;
  case "development":
    setEnvironment("./environments/.env.development");
    break;
  case "qa":
    setEnvironment("./environments/.env.qa");
    break;
  case "pre-prod":
    setEnvironment("./environments/.env.pre-prod");
    break;
  case "prod":
    setEnvironment("./environments/.env.prod");
    break;
  default:
    break;
}
function setEnvironment(path: string) {
  process.env = {
    ...process.env,
    ...require("dotenv").config({ path }).parsed,
  };
}
