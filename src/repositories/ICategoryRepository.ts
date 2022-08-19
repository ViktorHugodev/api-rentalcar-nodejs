import { Category } from '../model/Category'

interface IClassCategoryDTO {
  name: string
  description: string
}

interface ICaterogyRepository {
  findByName(name: string): Category
  list(): Category[]
  create({ name, description }: IClassCategoryDTO): void
}

export { ICaterogyRepository, IClassCategoryDTO }
