import mongoose from "mongoose";
import config from "../config";

export default async (): Promise<typeof mongoose.connection.db> => {
  await mongoose.connect(config.MONGO_URI);
  return mongoose.connection.db;
};
