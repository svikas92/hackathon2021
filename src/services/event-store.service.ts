import { AppDb } from "../db"
import { io } from "../server"
import { AppLoggers } from "../utils/loggers"
import { NotificationService } from "./notification.service"

export namespace EventStore {
  const getEventCollection = () => AppDb.getCollection<any>("userEvents")
  let timer: NodeJS.Timeout | undefined

  export const add = (data: any) => getEventCollection().insertOne(data)
  export const getTotal = () => getEventCollection().countDocuments()
  export const getLastEvent = () =>
    getEventCollection().findOne({ $query: {}, $orderby: { $natural: -1 } })

  export const getList = (filter: any, pagination: any) =>
    getEventCollection()
      .find(filter)
      .sort("_id", -1)
      .skip(pagination.pageNumber * pagination.pageSize)
      .limit(pagination.pageSize)
      .toArray()

  export const fire = (event: any) => {
    AppLoggers.info(`event fired: ${event.type}`)
    io.emit(event.type, event.data)
  }

  export const acknowledeEvent = () => {
    const defaultIdleTime = (50 + 1) * 1000
    if (!timer) {
      timer = setTimeout(() => {
        EventStore.fire({
          type: "APP_IDLE",
          data: {
            imgUrl: NotificationService.getInactiveMsg()
          }
        })
      }, defaultIdleTime)
    }

    timer.refresh()
  }

  export const unsubscribe = () => {
    if (timer) {
      AppLoggers.info("unsubsribed from user activity!")
      clearTimeout(timer)
      timer = undefined
    }
  }
}
