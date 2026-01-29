import winston from "winston";
const { ELK_DOMAIN, ELK_PORT, ELK_ENABLE } = process.env;

let elk_transport = [];

elk_transport.push(new winston.transports.Console());
if (ELK_ENABLE == "true") {
  elk_transport.push(
    new winston.transports.Http({
      host: ELK_DOMAIN,
      port: Number(ELK_PORT),
    }),
  );
}

export const info_logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: elk_transport,
});

export const error_logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: elk_transport,
});
