import express from "express";
import path from "path";
import viewsEngine from "ejs-locals";
import config, { logger } from "./config";
import authRoute from "./router/auth";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.engine("ejs", viewsEngine);
app.set("views", path.join(__dirname, "/../views"));
app.set("view engine", "ejs");
app.set("json spaces", 2);
app.use(express.static("public"));
app.use("/auth", authRoute);

io.on("connection", (socket: any) => {
  socket.emit("msg", "hi");
});

app.get("/", (_req, res) => {
  res.render("index");
});
server.listen(config.port, () => {
  logger.info(`Server started on port : ${config.port}`);
});
