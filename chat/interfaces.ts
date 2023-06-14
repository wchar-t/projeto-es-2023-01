export interface User {
  id: string,
  username: string,
  email: string,
  bio?: string,
  picture: string,
  createdAt: Date,
}

export interface Message {
  id: string, // timestamp + user
  author: User,
  content: string,
  channel: string,
}