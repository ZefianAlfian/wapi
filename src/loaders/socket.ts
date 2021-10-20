import express from "express";
import http from "http";
import { Server } from "socket.io";

export default (app: express.Application): Server => {
  const server = http.createServer(app);
  server.listen(3001);

  const io = new Server(server);

  io.on("connection", () => {
    io.emit("logs", "Connected to server");
  });
  return io;
};
