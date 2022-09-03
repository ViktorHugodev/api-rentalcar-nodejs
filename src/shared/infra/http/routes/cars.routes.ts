import { Router } from 'express'

import { CreateCarsController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController'
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'

const carsRoutes = Router()
const createCarsController = new CreateCarsController()
const listCarsController = new ListCarsController()
carsRoutes.get('/avaible', listCarsController.handle)
carsRoutes.post('/', authMiddleware, ensureAdmin, createCarsController.handle)

export { carsRoutes }
