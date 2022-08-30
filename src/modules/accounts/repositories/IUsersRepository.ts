import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/entities/User'

interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<void>
  list(): Promise<User[]>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
}

export { IUsersRepository }
