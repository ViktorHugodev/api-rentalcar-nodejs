import { Router } from 'express'

import { CategoryRepository } from '../repositories/CategoryRepository'
import { PostgresCategoryRepository } from '../repositories/PostgresCategoryRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()
const categoryRepository = new CategoryRepository()
// const categoryRepository = new PostgresCategoryRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createCategory = new CreateCategoryService(categoryRepository)

  createCategory.execute({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const list = categoryRepository.list()
  return response.status(200).json({ list })
})
export { categoriesRoutes }
