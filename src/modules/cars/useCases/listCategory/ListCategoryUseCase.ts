import { inject, injectable } from 'tsyringe'

import { Category } from '../../entities/Category'
import { ICaterogyRepository } from '../../repositories/ICategoryRepository'

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICaterogyRepository
  ) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()
    return categories
  }
}

export { ListCategoryUseCase }
