import { Category } from '../model/Category'

interface IClassCategoryDTO {
  name: string
  description: string
}

class CategoryRepository {
  private categories: Category[]
  constructor() {
    this.categories = []
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
