import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import viewsEngine from "ejs-locals";
import passport from "./passport";
import { apiRoutes as v1Routes } from "./routes";
import { logger } from "@config";

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
  app.use(express.static(path.join(__dirname, "/../../public")));

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // Set HTTP headers to protect from well known web vulnerabilities
  app.use(helmet());

  // Cookie
  app.use(cookieParser());

  // express session
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
    })
  );

  // passport auth
  app.use(passport.initialize());
  app.use(passport.session());

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

  app.use("/v1", v1Routes);
};
