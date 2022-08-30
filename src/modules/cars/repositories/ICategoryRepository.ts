import { Category } from '../infra/typeorm/entities/Category'

interface IClassCategoryDTO {
  name: string
  description: string
}

interface ICaterogyRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: IClassCategoryDTO): Promise<void>
}

export { ICaterogyRepository, IClassCategoryDTO }
