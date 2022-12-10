import { ICreateUsersTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO'

import { UsersToken } from '../entities/UsersToken'

interface IUsersTokenRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokenDTO): Promise<UsersToken>
}
export { IUsersTokenRepository }
