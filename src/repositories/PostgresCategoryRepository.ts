import { Category } from '../model/Category'
import { ICaterogyRepository, IClassCategoryDTO } from './ICategoryRepository'

class PostgresCategoryRepository implements ICaterogyRepository {
  findByName(name: string): Category {
    console.log(name)
    return null
  }
  list(): Category[] {
    return null
  }
  create({ name, description }: IClassCategoryDTO): void {
    console.log(name, description)
  }
}

export { PostgresCategoryRepository }
