import { Router } from 'express'

import { CreateCarsController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController'
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'

const carsRoutes = Router()
const createCarsController = new CreateCarsController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.get('/avaible', listCarsController.handle)
carsRoutes.post('/specification/:id', createCarSpecificationController.handle)
carsRoutes.post('/', authMiddleware, ensureAdmin, createCarsController.handle)

export { carsRoutes }
