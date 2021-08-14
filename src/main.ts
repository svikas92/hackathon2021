import { AppDb } from "./db"
import { registerHandlers } from "./handlers"
import { appServer } from "./server"
import { AppLoggers } from "./utils/loggers"

const port = 3000

registerHandlers()
AppDb.establishConnection().then(() => {
  appServer.listen(port, () => {
    AppLoggers.info(`Node app is running on port ${port}`)
  })
})
