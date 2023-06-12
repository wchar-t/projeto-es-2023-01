export default interface Session {
  id: string,
  username: string,
  email: string,
  bio?: string | null,
  createdAt: Date,
}
