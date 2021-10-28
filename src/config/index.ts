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

declare let process: {
  exit: Function;
  env: {
    NODE_ENV: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CALLBACK_URL: string;

    GITHUB_CLIENT_ID_DEV: string;
    GITHUB_CLIENT_SECRET_DEV: string;
    GITHUB_CALLBACK_URL_DEV: string;

    S3_ACCESS_ID: string;
    S3_ACCESS_KEY: string;
    OBJECT_STORAGE_ENDPOINT: string;
    BUCKET_NAME: string;
    BUCKET_URL: string;

    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: string;

    SITEMAP_PATH: string;

    LOG_LEVEL: string;
    AGENDA_DB_COLLECTION: string;
    AGENDA_POOL_TIME: string;
    AGENDA_CONCURRENCY: string;
  };
};

export default {
  PORT: process.env.PORT,
  MONGO_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : "mongodb://localhost:27017/wapi",
  JWT_SECRET: process.env.JWT_SECRET,

  BASE_URL:
    process.env.NODE_ENV === "production"
      ? "https://idk.com"
      : "http://localhost:3000",

  GITHUB_CLIENT_ID:
    process.env.NODE_ENV === "production"
      ? process.env.GITHUB_CLIENT_ID
      : process.env.GITHUB_CLIENT_ID_DEV,
  GITHUB_CLIENT_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.GITHUB_CLIENT_SECRET
      : process.env.GITHUB_CLIENT_SECRET_DEV,
  GITHUB_CALLBACK_URL:
    process.env.NODE_ENV === "production"
      ? "https://colte.dev/api/v1/auth/github/callback"
      : "http://localhost:3000/v1/auth/github/callback",
};
