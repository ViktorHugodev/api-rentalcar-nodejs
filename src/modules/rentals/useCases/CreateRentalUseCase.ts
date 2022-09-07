import { AppErrors } from '@errors/AppError'

import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalRepository) {}
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const carAvailable = await this.rentalRepository.findOpenRentalByCar(car_id)
    if (!carAvailable) {
      throw new AppErrors('Car isnot available')
    }
    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)
    if(!rentalOpenToUser) {
      throw new AppErrors('Rental is not available for this user right now')
    }
  }
}

export { CreateRentalUseCase }
