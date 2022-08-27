import { inject, injectable } from 'tsyringe'

import { Category } from '../../entities/Category'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute(): Promise<Category[]> {
    const specifications = await this.specificationRepository.list()
    return specifications
  }
}

export { ListSpecificationUseCase }
