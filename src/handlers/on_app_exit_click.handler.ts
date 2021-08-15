import { EventStore } from "../services"
import { NotificationService } from "../services/notification.service"

export const onAppExitClick = (event: any) => {
  const data = {
    type: event.type,
    data: event.payload,
    createdAt: Date.now()
  }

  EventStore.add(data)
  EventStore.acknowledeEvent()
  EventStore.fire({
    type: "APP_EXIT_CLICKED_RESPONSE",
    data: {
      imgUrl: NotificationService.getExitMsg()
    }
  })
}
