import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { AppErrors } from '../../../../errors/AppError'

import { IUserCreateDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: IUserCreateDTO): Promise<void> {
    const passwordHash = await hash(password, 8)
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) {
      throw new AppErrors('User already exists', 401)
    }
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
