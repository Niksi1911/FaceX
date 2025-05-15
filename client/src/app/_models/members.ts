import { Photo } from "./photo"

export interface Members {
    id: number
    username: string
    email: string
    age: number
    photoUrl: string
    gender: string
    country: string
    city: string
    photos: Photo[]
}
