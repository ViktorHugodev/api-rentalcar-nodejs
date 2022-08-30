import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({
    name,
    email,
    password,
    driver_license,
  }: IUserCreateDTO): Promise<void> {
    const user = new User()
    Object.assign(user, { name, email, password, driver_license })
    this.users.push(user)
  }

  async list(): Promise<User[]> {
    return this.users
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }
}

export { UsersRepositoryInMemory }
