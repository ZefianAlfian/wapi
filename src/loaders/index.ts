import express from "express";
import { logger } from "../config";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import socketLoader from "./socket";

export default async (app: express.Application): Promise<void> => {
  const mongoConnection = await mongooseLoader();
  logger.info("DB Connection loaded");

  socketLoader(app);
  logger.info("Socket loaded");

  //   const agendaInstance = agendaFactory(mongoConnection);
  //   logger.info("✌️ Agenda Created");

  //   await dependencyInjectorLoader(app, agendaInstance);
  //   logger.info("✌️ Dependency Injector loaded");

  //   jobsLoader(agendaInstance);
  //   logger.info("✌️ Jobs loaded");

  expressLoader(app);
  logger.info("Express loaded");
};
