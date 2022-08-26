import { Category } from '../entities/Category'
// Esse arquivo é a chave de criação, outros se adequam a ele.
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
