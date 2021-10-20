import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import viewsEngine from "ejs-locals";
import passport from "./passport";
import authRoute from "../router/auth";

export default (app: express.Application): void => {
  app.use(cors());

  // Stats check
  app.get("/status", (req, res) => {
    res.status(200).json().end();
  });

  //View engine
  app.engine("ejs", viewsEngine);
  app.set("views", path.join(__dirname, "/../views"));
  app.set("view engine", "ejs");

  // It shows the real origin IP in the heroku or Cloudwatch logs
  // app.enable("trust proxy");

  // Set HTTP headers to protect from well known web vulnerabilities
  // app.use(helmet());

  // Cookie
  app.use(cookieParser());

  // passport auth
  app.use(passport.initialize());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());

  // Trim all body
  app.use((req, res, next) => {
    if (req.body) {
      req.body = JSON.parse(
        JSON.stringify(req.body, (key, value) => {
          if (typeof value === "string") return value.trim();
          return value;
        })
      );
    }
    next();
  });

  app.use("/auth", authRoute);
};
