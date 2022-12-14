import { NextFunction, Request, Response } from 'express'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user
  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(id)
  console.log('🚀 ~ file: ensureAdmin.ts:13 ~ user', user)
  if (!user.isAdmin) {
    throw new Error('User isnt an admin')
  }
  return next()
}
