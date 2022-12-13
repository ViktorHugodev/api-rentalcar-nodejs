import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ password, token }: IRequest): Promise<void> {
    try {
      const userToken = await this.usersTokenRepository.findByRefreshToken(
        token
      )
      console.log('🚀 ~ file: ResetPasswordUserUseCase.ts:29 ~ ResetPasswordUserUseCase ~ execute ~ userToken', userToken)
      if (!userToken) {
        throw new AppErrors('Token invalid!')
      }
      const isBefore = this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
      if (isBefore) {
        throw new AppErrors('Token expired!')
      }

      const user = await this.usersRepository.findById(userToken.user_id)
      if (!user) {
        throw new AppErrors('User not found!')
      }
      user.password = await hash(password, 8)
      await this.usersRepository.create(user)
      await this.usersTokenRepository.deleteById(userToken.id)
    } catch (err) {
      console.log('err', err)
    }
  }
}
export { ResetPasswordUserUseCase }
