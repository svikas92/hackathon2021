import axios from "axios"
import { exitOnError } from "winston"

export namespace NotificationService {
  const IMG_REPO = "https://picsum.photos/v2/list"
  const httpClient = axios.create()

  export const getRandomImages = async (count: number) => {
    const url = `${IMG_REPO}?page=${Math.floor(
      Math.random() * 3
    )}&limit=${count}`

    const imgs = await httpClient.get(url)
    return imgs.data.map((img: any) => img.url)
  }

  export const activeImages = [
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-1.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-1.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-1.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg"
  ]

  export const exitImages = [
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/exit-1.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/exit-2.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/exit-1.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/exit-2.jpg"
  ]

  export const inactiveImages = [
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-1.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-2.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/inactive-3.jpg",
    "https://dev-media-uploader.s3.ap-southeast-1.amazonaws.com/hackathon2021/personlized-1.jpeg"
  ]

  export const getExitMsg = () =>
    exitImages[Math.floor(Math.random() * exitImages.length)]

  export const getRandomActiveImg = () => {}

  export const getInactiveMsg = () => {
    return inactiveImages[Math.floor(Math.random() * inactiveImages.length)]
  }

  export const getActiveMsg = () => {
    return activeImages[Math.floor(Math.random() * activeImages.length)]
  }
}
