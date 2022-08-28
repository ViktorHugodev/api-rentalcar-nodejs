import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { AppErrors } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeaders = request.headers.authorization

  if (!authHeaders) {
    throw new AppErrors('Token is missing', 401)
  }

  const [, token] = authHeaders.split(' ')

  try {
    const { sub: user_id } = verify(token, 'cf4f5a13c44d8b18866116c759ee4ab6')
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id as string)
    if (!user) {
      throw new AppErrors('User does not exist', 404)
    }
    next()
  } catch (error) {
    throw new AppErrors('Invalid token', 401)
  }
}
