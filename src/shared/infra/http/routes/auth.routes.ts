import { Router } from 'express'

import { AuthUserController } from '@modules/accounts/useCases/authUser/AuthUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'

const authRoutes = Router()

const authUserController = new AuthUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/auth', authUserController.handle)
authRoutes.post('/refresh', refreshTokenController.handle)

export { authRoutes }
