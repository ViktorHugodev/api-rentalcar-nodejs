import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/CreateRentalController'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
rentalRoutes.use(authMiddleware)
rentalRoutes.post('/', createRentalController.handle)

export { rentalRoutes }
