import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/DevolutionRentalController'

import { authMiddleware } from '../middleware/ensureAuth'

const devolutionRoutes = Router()
const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

devolutionRoutes.post('/devolution/:id', authMiddleware, devolutionRentalController.handle)
devolutionRoutes.post('/', authMiddleware, createRentalController.handle)

export { devolutionRoutes }
