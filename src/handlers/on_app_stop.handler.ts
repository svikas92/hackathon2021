import { EventStore } from "../services"
import { AppLoggers } from "../utils"

export const onAppStop = (event: any) => {
  const data = {
    type: event.type,
    data: event.payload,
    createdAt: Date.now()
  }

  EventStore.add(data)
  EventStore.acknowledeEvent()
  EventStore.unsubscribe()
}
