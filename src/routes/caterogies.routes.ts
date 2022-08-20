import { Router } from 'express'

import { createCategoryController } from '../modules/cars/useCases/createCategory/index'
import { listCategoryController } from '../modules/cars/useCases/listCategory/index'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return listCategoryController.handle(request, response)
})
export { categoriesRoutes }
