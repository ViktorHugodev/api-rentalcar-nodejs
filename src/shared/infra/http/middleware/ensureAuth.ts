import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { AppErrors } from '@errors/AppError'
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository'

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeaders = request.headers.authorization
  console.log('🚀 ~ file: ensureAuth.ts:14 ~ authHeaders', authHeaders)
  const usersTokenRepotory = new UsersTokenRepository()
  if (!authHeaders) {
    throw new AppErrors('Token is missing', 401)
  }

  const [, token] = authHeaders.split(' ')

  try {
    // now que secret for login its the refresh token
    const { sub: user_id } = verify(token, auth.secret_refresh_token)
    const user = await usersTokenRepotory.findByUserIdAndRefresh(
      user_id as string,
      token
    )
    if (!user) {
      throw new AppErrors('User does not exist', 404)
    }
    request.user = {
      id: user_id as string,
    }
    next()
  } catch (error) {
    throw new AppErrors('Invalid token', 401)
  }
}
