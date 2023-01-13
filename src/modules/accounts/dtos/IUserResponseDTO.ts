interface IUserResponseDTO {
  name: string
  email: string
  driver_license: string
  avatar: string
  created_at: string
  getAvatarUrl(): string
}
export { IUserResponseDTO }
