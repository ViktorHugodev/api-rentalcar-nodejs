import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository'

interface IRequest {
  car_id: string
  specification_id: string[]
}

@injectable()
class CreateCarSpeficiationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)
    if (!carExists) {
      throw new AppErrors('Car does not exist')
    }
    const specifications = await this.specificationRepository.findByIds(
      specification_id
    )
    carExists.speficiations = specifications
    await this.carsRepository.create(carExists)
    return carExists
  }
}

export { CreateCarSpeficiationUseCase }
