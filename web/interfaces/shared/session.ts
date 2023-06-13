export default interface Session {
  id: string,
  username: string,
  email: string,
  bio?: string | null,
  picture: string,
  createdAt: Date,
}
