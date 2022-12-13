import { Request, Response } from 'express'
import { resolve } from 'path'
import { container } from 'tsyringe'

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body
    const { token } = request.query
    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)
    resetPasswordUserUseCase.execute({ password, token: token as string })
    return response.send()
  }
}

export { ResetPasswordUserController }
