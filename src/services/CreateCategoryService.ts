import { ICaterogyRepository } from '../repositories/ICategoryRepository'

interface ICategoryService {
  description: string
  name: string
}

class CreateCategoryService {
  constructor(private categoryRepository: ICaterogyRepository) {}
  execute({ description, name }: ICategoryService): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name)
    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }
    this.categoryRepository.create({ name, description })
  }
}

export { CreateCategoryService }
