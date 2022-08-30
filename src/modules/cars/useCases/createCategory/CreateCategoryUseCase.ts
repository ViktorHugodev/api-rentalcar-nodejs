import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { ICaterogyRepository } from '@modules/cars/repositories/ICategoryRepository'

interface ICategoryService {
  description: string
  name: string
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICaterogyRepository
  ) {}
  async execute({ description, name }: ICategoryService): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name)
    if (categoryAlreadyExists) {
      throw new AppErrors('Category already exists')
    }
    this.categoryRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
