import { AppErrors } from '@errors/AppError'

import { RentalCar } from '../infra/typeorm/entities/RentalCar'
import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository'

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<RentalCar> {
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)
    if (carUnavailable) {
      throw new AppErrors('Car isnot available')
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    )

    if (rentalOpenToUser) {
      throw new AppErrors('Rental is not available for this user right now')
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    })
    return rental
  }
}

export { CreateRentalUseCase }
