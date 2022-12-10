import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { AppErrors } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider'

interface IRequestLogin {
  email: string
  password: string
}

interface IResponseLogin {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequestLogin): Promise<IResponseLogin> {
    const user = await this.userRepository.findByEmail(email)
    const {
      expires_in_refresh_token,
      expires_in,
      secret_refresh_token,
      secret_token,
    } = auth
    if (!user) {
      throw new AppErrors('Email or password is incorrect', 401)
    }

    const passwordCorrect = await compare(password, user.password)
    if (!passwordCorrect) {
      throw new AppErrors('Email or password is incorrect', 401)
    }
    // hash gerada MD5
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in,
    })
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })
   

    const refresh_token_expires_date = this.dateProvider.addDays(30)
    
    const create = await this.usersTokenRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    })
    console.log('🚀 ~ file: AuthUserUseCase.ts:70 ~ AuthUserUseCase ~ execute ~ create', create)

    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token
    }
    return tokenReturn
  }
}

export { AuthUserUseCase }
