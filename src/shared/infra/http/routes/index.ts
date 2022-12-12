import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './caterogies.routes'
import { passwordResetRoutes } from './password.routes'
import { rentalRoutes } from './rental.routes'
import { specificationRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/cars', carsRoutes)
router.use('/users', usersRoutes)
router.use('/rentals', rentalRoutes)
router.use('/', passwordResetRoutes)
router.use(authRoutes)

export { router }
