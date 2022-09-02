import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController'

import { ensureAdmin } from '../middleware/ensureAdmin'
import { authMiddleware } from '../middleware/ensureAuth'

const specificationRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listSpecificationController = new ListSpecificationController()

specificationRoutes.get('/', listSpecificationController.handle)
specificationRoutes.use(authMiddleware, ensureAdmin)
specificationRoutes.post('/', createSpecificationController.handle)

export { specificationRoutes }
