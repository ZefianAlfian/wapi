import express from "express";
import config, { logger } from "./config";
import loader from "./loaders";

// app.set("json spaces", 2);
// app.use(express.static("public"));
// app.use("/auth", authRoute);

// io.on("connection", (socket: any) => {
//   socket.emit("msg", "hi");
// });

// app.get("/", (_req, res) => {
//   res.render("index");
// });

// server.listen(config.port, () => {
//   logger.info(`Server started on port : ${config.port}`);
// });

async function startServer(): Promise<void> {
  const app = express();

  await loader(app);

  app.listen(config.PORT, () => {
    logger.info(`Server listening on port : ${config.PORT}`);
  });
}
startServer();
