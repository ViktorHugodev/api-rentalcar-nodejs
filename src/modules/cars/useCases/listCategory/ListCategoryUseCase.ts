import { Category } from '../../entities/Category'
import { ICaterogyRepository } from '../../repositories/ICategoryRepository'

// CreateService tem a única função, criar um serivço, nada mais
class ListCategoryUseCase {
  constructor(private categoryRepository: ICaterogyRepository) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()
    return categories
  }
}

export { ListCategoryUseCase }
