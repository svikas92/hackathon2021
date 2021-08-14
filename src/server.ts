import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
export const appServer = createServer(app)
export const io = new Server(appServer)
