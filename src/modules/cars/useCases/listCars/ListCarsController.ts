import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListCarsUseCase } from './ListCarsUseCase'

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, category_id, brand } = request.query
    console.log(request.query)
    const listCarsUseCase = container.resolve(ListCarsUseCase)
    const cars = await listCarsUseCase.execute({
      name: name as string,
      category_id: category_id as string,
      brand: brand as string,
    })
    return response.json(cars)
  }
}
export { ListCarsController }
