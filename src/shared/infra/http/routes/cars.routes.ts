import { Router } from 'express'

import { CreateCarsController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'

const carsRoutes = Router()
const createCarsController = new CreateCarsController()
carsRoutes.post('/', authMiddleware, ensureAdmin, createCarsController.handle)

export { carsRoutes }
