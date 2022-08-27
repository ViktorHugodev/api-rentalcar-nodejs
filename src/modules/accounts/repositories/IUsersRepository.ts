import { IUserCreateDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<void>
  list(): Promise<void>
  findByName(name: string): Promise<User>
}

export { IUsersRepository }
