import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../../repositories/IUsersRepository'

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
}
@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequestLogin): Promise<IResponseLogin> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('Email or password is incorrect')
    }

    const passwordCorrect = await compare(password, user.password)
    if (!passwordCorrect) {
      throw new Error('Email or password is incorrect')
    }
    // hash gerada MD5
    const token = sign({}, 'cf4f5a13c44d8b18866116c759ee4ab6', {
      subject: user.id,
      expiresIn: '1d',
    })
    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }
    return tokenReturn
  }
}

export { AuthUserUseCase }
