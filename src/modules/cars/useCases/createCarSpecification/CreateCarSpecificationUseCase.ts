import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository';
import { AppErrors } from '@errors/AppError'

interface IRequest {
  car_id: string
  specification_id: string
}

class CreateCarSpeficiationUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  async execute({ car_id, specification_id }: IRequest): Promise<void> {
    const carExists = this.carsRepository.findById(car_id)
    if (!carExists) {
      throw new AppErrors('Car does not exist')
    }
  }
}

export { CreateCarSpeficiationUseCase }
