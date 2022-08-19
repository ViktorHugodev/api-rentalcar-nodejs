import { CategoryRepository } from '../repositories/CategoryRepository'

interface ICategoryService {
  description: string
  name: string
}

class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  execute({ description, name }: ICategoryService): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name)
    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }
    this.categoryRepository.create({ name, description })
  }
}

export { CreateCategoryService }
