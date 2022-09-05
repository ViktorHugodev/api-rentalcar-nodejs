import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarSpeficiationUseCase } from './CreateCarSpecificationUseCase'

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specification_id } = request.body
    const { id: car_id } = request.params
    const createCarSpeficiationUseCase = container.resolve(
      CreateCarSpeficiationUseCase
    )

    const cars = await createCarSpeficiationUseCase.execute({
      car_id,
      specification_id,
    })
    return response.json(cars)
  }
}

export { CreateCarSpecificationController }
