import { ICreateUsersTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO'

import { UsersToken } from '../entities/UsersToken'

interface IUsersTokenRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokenDTO): Promise<UsersToken>
  findByUserIdAndRefresh(id: string, refresh_token): Promise<UsersToken>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UsersToken>
}
export { IUsersTokenRepository }
