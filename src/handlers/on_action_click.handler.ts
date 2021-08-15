import { EventStore } from "../services"
import { NotificationService } from "../services/notification.service"

export const onActionClick = async (event: any) => {
  const data = {
    type: event.type,
    data: event.payload,
    createdAt: Date.now()
  }

  EventStore.add(data)
  EventStore.acknowledeEvent()
  EventStore.fire({
    type: "ACTION_FIRED_RESPONSE",
    data: {
      images: NotificationService.activeImages
    }
  })
}
