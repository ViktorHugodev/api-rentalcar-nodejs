import { ICaterogyRepository } from '../../repositories/ICategoryRepository'

interface ICategoryService {
  description: string
  name: string
}
// CreateService tem a única função, criar um serivço, nada mais
class CreateCategoryUseCase {
  constructor(private categoryRepository: ICaterogyRepository) {}
  async execute({ description, name }: ICategoryService): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name)
    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }
    this.categoryRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
