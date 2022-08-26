import { Response, Request } from 'express'

import { ListCategoryUseCase } from './ListCategoryUseCase'

class ListCategoryController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}
  async handle(request: Request, response: Response) {
    const categories = await this.listCategoryUseCase.execute()
    return response.status(201).json(categories)
  }
}

export { ListCategoryController }
