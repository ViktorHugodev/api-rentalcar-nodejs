import { parse } from 'csv-parse'
import fs from 'fs'

import { ICaterogyRepository } from '../../repositories/ICategoryRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICaterogyRepository) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []
      const stream = fs.createReadStream(file.path)
      const parseFile = parse()
      stream.pipe(parseFile)
      parseFile
        .on('data', async (line) => {
          const [name, description] = line
          categories.push({ name, description })
        })
        .on('end', () => {
          resolve(categories)
        })
        .on('error', (error) => reject(error))
    })
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map(async (category) => {
      const { name, description } = category

      const categoryAlreadyExists = this.categoryRepository.findByName(name)
      if (!categoryAlreadyExists) {
        this.categoryRepository.create({ name, description })
      }
    })
  }
}

export { ImportCategoryUseCase }
