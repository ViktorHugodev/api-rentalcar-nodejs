import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { AppErrors } from '@errors/AppError'

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
    // now que secret for login its the refresh token
    const { sub: user_id } = verify(token, auth.secret_token)

    request.user = {
      id: user_id as string,
    }
    next()
  } catch (error) {
    throw new AppErrors('Invalid token', 401)
  }
}
