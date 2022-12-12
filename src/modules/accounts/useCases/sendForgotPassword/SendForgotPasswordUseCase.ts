import { IDateProvider } from '@shared/container/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import { AppErrors } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokenRepository'

@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppErrors('User does not exists')
    }
    const token = uuidv4()
    const expires_date = this.dateProvider.addHours(3)
    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })
  }
}

export { SendForgotPasswordUseCase }
