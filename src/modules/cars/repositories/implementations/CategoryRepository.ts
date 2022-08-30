import { Repository } from 'typeorm'

import { Category } from '@modules/cars/entities/Category'

import AppDataSource from '../../../../database/data-source'
import { ICaterogyRepository, IClassCategoryDTO } from '../ICategoryRepository'

class CategoryRepository implements ICaterogyRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create({ name, description }: IClassCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    })
    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name })
    return category
  }
}

export { CategoryRepository }
