import { instanceToInstance } from 'class-transformer'

import { IUserResponseDTO } from '../dtos/IUserResponseDTO'
import { User } from '../infra/typeorm/entities/User'

class UserMapper {
  static toDTO({
    name,
    email,
    driver_license,
    avatar,
    created_at,
    
    getAvatarUrl,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      name,
      email,
      driver_license,
      avatar,
      created_at,
      getAvatarUrl,
    })
    return user
  }
}

export { UserMapper }
