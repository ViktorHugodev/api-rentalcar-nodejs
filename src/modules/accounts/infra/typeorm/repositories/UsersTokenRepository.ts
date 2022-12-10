import { Repository } from 'typeorm'

import { ICreateUsersTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO'
import AppDataSource from '@shared/infra/database/data-source'

import { UsersToken } from '../entities/UsersToken'
import { IUsersTokenRepository } from './IUsersTokenRepository'

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>
  constructor() {
    this.repository = AppDataSource.getRepository(UsersToken)
  }
  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    })
    await this.repository.save(userToken)
    return userToken
  }
}

export { UsersTokenRepository }
