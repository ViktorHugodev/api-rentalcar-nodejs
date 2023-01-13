import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { UserMapper } from '@modules/accounts/mapper/userMapper'

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new AppErrors('User not found')
    return UserMapper.toDTO(user)
  }
}

export { ProfileUserUseCase }
