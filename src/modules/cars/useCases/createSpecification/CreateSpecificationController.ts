import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase copy'

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    )
    await createSpecificationUseCase.execute({ name, description })

    return response.status(201).json({ message: 'Specification created' })
  }
}

export { CreateSpecificationController }
