import { Router } from 'express'
import multer from 'multer'

import { authMiddleware } from '../middleware/AuthMiddleware'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController'

const upload = multer({ dest: './tmp/' })

const categoriesRoutes = Router()
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.use(authMiddleware)
categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
)

export { categoriesRoutes }
