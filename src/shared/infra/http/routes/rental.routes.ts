import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/DevolutionRentalController'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'
import { ListRentalByUserController } from '@modules/rentals/useCases/ListRentalByUserController'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalByUserController()

rentalRoutes.use(authMiddleware)
rentalRoutes.post('/',createRentalController.handle)
rentalRoutes.get('/list',  listRentalByUserController.handle)
rentalRoutes.post(
  '/devolution/:id',
  authMiddleware,
  devolutionRentalController.handle
)

export { rentalRoutes }
