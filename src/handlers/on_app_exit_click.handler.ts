import { EventStore } from "../services"

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
      imgUrl: getExitMsg()
    }
  })
}

const exitImages = [
  "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/exit-1.jpg",
  "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/exit-2.jpg"
]

const getExitMsg = () => {
  return exitImages[Math.floor(Math.random() * exitImages.length)]
}
