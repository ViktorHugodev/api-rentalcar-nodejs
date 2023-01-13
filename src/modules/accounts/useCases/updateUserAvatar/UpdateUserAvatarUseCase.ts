import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/container/StorageProvider/IStorageProvider'

interface IRequest {
  user_id: string
  avatar_file: string
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('S3StorageProvider')
    private localStorageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id)

    if (user.avatar) {
      await this.localStorageProvider.delete(user.avatar, 'avatar')
    }
    await this.localStorageProvider.save(avatar_file, 'avatar')

    user.avatar = avatar_file

    await this.userRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }
