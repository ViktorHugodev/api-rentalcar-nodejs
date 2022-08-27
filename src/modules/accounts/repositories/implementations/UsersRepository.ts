import { Repository } from 'typeorm'

import AppDataSource from '../../../../database/data-source'
import { IUserCreateDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    name,
    email,
    password,
    driver_license,
    username,
  }: IUserCreateDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      username,
    })
    await this.repository.save(user)
  }
  list(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findByName(name: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}

export { UsersRepository }
