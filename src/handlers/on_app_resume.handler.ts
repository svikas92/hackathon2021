import { EventStore } from "../services"
import { AppLoggers } from "../utils"

export const onAppResume = async (event: any) => {
  const data = {
    type: event.type,
    data: event.payload,
    createdAt: Date.now()
  }

  
  const lastActivity = await EventStore.getLastEvent()
  EventStore.add(data)
  EventStore.acknowledeEvent()

  if (lastActivity) {
    let diff = Date.now() - lastActivity.createdAt
    diff = Math.floor(diff / 1000)

    EventStore.fire({
      type: "APP_RESUMED_RESPONSE",
      data: {
        imgUrl:
          "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
        message: `Welcome Back!, you were gone for ${Math.floor(
          diff / 60
        )} mins ${diff} secs`
      }
    })
  }
}
