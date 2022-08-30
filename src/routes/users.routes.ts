import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

import uploadConfig from '../config/upload'
import { authMiddleware } from '../middleware/AuthMiddleware'

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
// usersRoutes.use(authMiddleware)
usersRoutes.post('/', createUserController.handle)
usersRoutes.patch(
  '/avatar',
  authMiddleware,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
