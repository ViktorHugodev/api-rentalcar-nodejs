import { Request, Response } from 'express'
import { container, injectable } from 'tsyringe'

import { DevolutionUseCase } from './DevolutionRentalUseCase'

@injectable()
class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { id } = request.params
    const devolutionRentalUseCase = container.resolve(DevolutionUseCase)
    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    })
    return response.status(200).json(rental)
  }
}

export { DevolutionRentalController }
