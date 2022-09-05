import { AppErrors } from '@errors/AppError'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository'

interface IRequest {
  car_id: string
  specification_id: string[]
}

class CreateCarSpeficiationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specification_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id)
    if (!carExists) {
      throw new AppErrors('Car does not exist')
    }
    const specifications = await this.specificationRepository.findByIds(
      specification_id
    )
    carExists.speficiations = specifications
    await this.carsRepository.create(carExists)
  }
}

export { CreateCarSpeficiationUseCase }
