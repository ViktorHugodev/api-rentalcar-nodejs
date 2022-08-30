import { inject, injectable } from 'tsyringe'

import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'

import { Category } from '../../entities/Category'

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
