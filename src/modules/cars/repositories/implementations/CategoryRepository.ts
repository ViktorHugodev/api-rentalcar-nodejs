import { Category } from '../../model/Category'
import { ICaterogyRepository, IClassCategoryDTO } from '../ICategoryRepository'
// Crio uma classe e digo que será uma implementação da tipagem ICaterogyRepository -PRIVATE
class CategoryRepository implements ICaterogyRepository {
  private categories: Category[]

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoryRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository()
    }
    return CategoryRepository.INSTANCE
  }

  create({ name, description }: IClassCategoryDTO): void {
    const category = new Category()
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }
  list(): Category[] {
    return this.categories
  }
  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
}

export { CategoryRepository }
