import { EventStore } from "../services"
import { AppLoggers } from "../utils/loggers"

export const onActionClick = (event: any) => {
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
      images: [
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-1.jpg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-1.jpg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
        "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg"
      ]
    }
  })
}
