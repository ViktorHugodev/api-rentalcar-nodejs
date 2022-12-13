import { Router } from 'express'

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPassword/ResetPasswordUserController'
import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController'

const passwordResetRoutes = Router()

const sendForgotPasswordController = new SendForgotPasswordController()
const resetPasswordUserController = new ResetPasswordUserController()
passwordResetRoutes.post('/forgot', sendForgotPasswordController.handle)
passwordResetRoutes.post('/reset', resetPasswordUserController.handle)
export { passwordResetRoutes }
