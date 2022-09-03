import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarUseCase } from './CreateCarUseCase'

class CreateCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
    } = request.body
    const createCarUseCase = container.resolve(CreateCarUseCase)
    const car = await createCarUseCase.execute({
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
    })
    return response.status(201).json(car)
  }
}

export { CreateCarsController }
