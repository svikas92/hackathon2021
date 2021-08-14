import { io } from "socket.io-client"
import { AppLoggers } from "./utils/loggers"
const socket = io("ws://localhost:3000")

socket.on("connect", () => {
  // either with send()
  socket.send("Hello!")

  // or with emit() and custom event names
  socket.emit(
    "salutations",
    "Hello!",
    { mr: "john" },
    Uint8Array.from([1, 2, 3, 4])
  )
})

// handle the event sent with socket.send()
socket.on("message", data => {
  AppLoggers.info(data)
})
