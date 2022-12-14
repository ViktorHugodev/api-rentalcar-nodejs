import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { ISpecificationRepository } from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppErrors('Specification already exists')
    }
    await this.specificationRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
