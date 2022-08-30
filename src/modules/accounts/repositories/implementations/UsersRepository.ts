import { Repository } from 'typeorm'

import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/entities/User'

import AppDataSource from '../../../../database/data-source'
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
    avatar,
    driver_license,
    id,
  }: IUserCreateDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      avatar,
      driver_license,
      id,
    })
    await this.repository.save(user)
  }
  list(): Promise<User[]> {
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
