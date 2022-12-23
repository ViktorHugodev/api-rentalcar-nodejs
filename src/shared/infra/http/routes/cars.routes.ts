import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateCarsController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController'
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController'
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'

const carsRoutes = Router()
const uploadImagesCar = multer(uploadConfig)
const createCarsController = new CreateCarsController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.get('/avaible', listCarsController.handle)
carsRoutes.post(
  '/images/:id',
  authMiddleware,
  ensureAdmin,
  uploadImagesCar.array('images'),
  uploadCarImageController.handle
)
carsRoutes.post('/specification/:id', createCarSpecificationController.handle)
carsRoutes.post('/', authMiddleware, ensureAdmin, createCarsController.handle)

export { carsRoutes }
