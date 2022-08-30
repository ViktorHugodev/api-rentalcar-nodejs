import { Category } from '@modules/cars/entities/Category'

import { ICaterogyRepository, IClassCategoryDTO } from '../ICategoryRepository'

class CategoryRepositoryInMemory implements ICaterogyRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
  async list(): Promise<Category[]> {
    const list = this.categories
    return list
  }
  async create({ name, description }: IClassCategoryDTO): Promise<void> {
    const category = new Category()
    Object.assign(category, { name, description })
    this.categories.push(category)
  }
}

export { CategoryRepositoryInMemory }
