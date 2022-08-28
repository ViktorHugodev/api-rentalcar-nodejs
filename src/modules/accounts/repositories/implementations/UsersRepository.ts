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
  }: IUserCreateDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    })
    await this.repository.save(user)
  }
  list(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<User> {
    const user = this.repository.findOneBy({ id })
    return user
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email })
    return user
  }
}

export { UsersRepository }
