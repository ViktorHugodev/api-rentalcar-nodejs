import { IUserCreateDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<void>
  list(): Promise<void>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
}

export { IUsersRepository }
