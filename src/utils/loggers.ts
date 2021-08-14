import { createLogger, transports, format, Logger } from "winston"
import util from "util"

export namespace AppLoggers {
  let logger: Logger

  const getLogger = () => {
    if (!logger) {
      logger = createLogger({
        format: format.combine(
          format.colorize(),
          format.prettyPrint(),
          format.splat(),
          format.simple()
        ),
        transports: [new transports.Console()]
      })
    }

    return logger
  }

  export const json = (data: any) => {
    data = util.inspect(data, false, null, true)
    return getLogger()
      .info(data)
      .bind(logger)
  }

  export const info = (data: any) => getLogger().info(data)
  export const error = (err: any) => getLogger().error(err)
}
