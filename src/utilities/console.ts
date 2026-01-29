import { error_logger, info_logger } from "./logger";

export const customConsole = () => {
  console.log = function () {
    const args = Array.from(arguments);
    info_logger.info(args);
  };
  console.error = function () {
    const args = Array.from(arguments);
    error_logger.error(args);
  };
};
