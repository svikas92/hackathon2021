import express from "express"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import { AppLoggers } from "./utils/loggers"

const app = express()
const port = 3000
const httpServer = createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket: Socket) => {
  AppLoggers.info("client connected")
})

httpServer.listen(port, () => {
  AppLoggers.info(`Node app is running on port ${port}`)
})
