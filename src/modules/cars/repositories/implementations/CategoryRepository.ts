import { Repository } from 'typeorm'

import dataSource from '../../../../database/data-source'
import { Category } from '../../entities/Category'
import { ICaterogyRepository, IClassCategoryDTO } from '../ICategoryRepository'
// Crio uma classe e digo que será uma implementação da tipagem ICaterogyRepository -PRIVATE++

class CategoryRepository implements ICaterogyRepository {
  private repository: Repository<Category>
  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoryRepository

  constructor() {
    this.repository = dataSource.getRepository(Category)
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
