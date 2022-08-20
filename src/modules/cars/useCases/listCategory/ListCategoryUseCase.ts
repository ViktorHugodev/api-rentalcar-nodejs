import { Category } from '../../model/Category'
import { ICaterogyRepository } from '../../repositories/ICategoryRepository'

// CreateService tem a única função, criar um serivço, nada mais
class ListCategoryUseCase {
  constructor(private categoryRepository: ICaterogyRepository) {}
  execute(): Category[] {
    const categories = this.categoryRepository.list()
    return categories
  }
}

export { ListCategoryUseCase }
