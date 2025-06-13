export interface Message {
  id: number
  senderId: number
  senderUsername: string
  senderPhotoUrl: string
  reciverId: number
  reciverUsername: string
  reciverPhotoUrl: string
  content: string
  dateRead?: Date
  messageSent: Date
}
