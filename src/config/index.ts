import dotenv from "dotenv";
import pino from "pino";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export const logger = pino({
  prettyPrint: { levelFirst: true, ignore: "hostname", translateTime: true },
  prettifier: require("pino-pretty"),
});

const envFound = dotenv.config();
if (envFound.error) {
  logger.error("Couldn't find .env file");
  process.exit(1);
}

export default {
  port: process.env.PORT,
};
