import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController'

import { ensureAdmin } from '../middleware/ensureAdmin'
import { authMiddleware } from '../middleware/ensureAuth'

const upload = multer({ dest: './tmp/' })

const categoriesRoutes = Router()
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post(
  '/',
  authMiddleware,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.post(
  '/import',
  ensureAdmin,
  authMiddleware,
  upload.single('file'),
  importCategoryController.handle
)

export { categoriesRoutes }
