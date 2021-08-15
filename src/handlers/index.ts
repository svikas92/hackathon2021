import { io } from "../server"
import { EventStore } from "../services"
import { AppLoggers } from "../utils/loggers"
import { onAppExitClick } from "./on_app_exit_click.handler"
import { onActionClick } from "./on_action_click.handler"
import { onAppResume } from "./on_app_resume.handler"
import { onAppStop } from "./on_app_stop.handler"
import { onScreenTouch } from "./on_screen_touch.handler"
import { Socket } from "socket.io"

function mountHandler(socket: Socket, name: string, handler: Function) {
  socket.on(name, function() {
    AppLoggers.info(`event received: ${name}`)
    const args = [].slice.apply(arguments)
    const payload = args.pop()

    args.unshift({
      type: name,
      payload
    })
    handler.apply(null, args)
  })
}

export const registerHandlers = () => {
  //   io.use((socket, next) => {
  //     AppLoggers.info(`incoming event!`)
  //     next()
  //   })

  io.on("connection", socket => {
    AppLoggers.info("new client connected!")

    mountHandler(socket, "SCREEN_TOUCHED", onScreenTouch)
    mountHandler(socket, "APP_EXIT_CLICKED", onAppExitClick)
    mountHandler(socket, "ACTION_FIRED", onActionClick)
    mountHandler(socket, "APP_RESUMED", onAppResume)
    mountHandler(socket, "APP_STOPPED", onAppStop)

    socket.on("disconnect", EventStore.unsubscribe)
  })
}
