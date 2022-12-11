import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { AppErrors } from '@errors/AppError'
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider'

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<string> {
    const { expires_in_refresh_token, secret_refresh_token } = auth
    const { sub: user_id, email } = verify(
      token,
      secret_refresh_token
    ) as IPayload

    const userToken = await this.usersTokenRepository.findByUserIdAndRefresh(
      user_id,
      token
    )
    if (!userToken) {
      throw new AppErrors('Refresh token does not exists!')
    }
    await this.usersTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    })
    const expires_date = this.dateProvider.addDays(30)
    const test = await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id,
    })
    return refresh_token
  }
}

export { RefreshTokenUseCase }
