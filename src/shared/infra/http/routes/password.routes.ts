import { Router } from 'express'

import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController'
import { authMiddleware } from '@shared/infra/http/middleware/ensureAuth'

const passwordResetRoutes = Router()

const sendForgotPasswordController = new SendForgotPasswordController()

passwordResetRoutes.post('/forgot', sendForgotPasswordController.handle)

export {
  passwordResetRoutes
}