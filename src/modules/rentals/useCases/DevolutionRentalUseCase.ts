import { inject } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider'

import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository'
import { RentalCar } from '../infra/typeorm/entities/RentalCar'

interface IRequest {
  id: string
  user_id: string
}

class DevolutionUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalsRepository: IRentalRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }
  async execute({ id, user_id }: IRequest): Promise<RentalCar> {
    const minimum_daily = 1
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(id)
    if (!rental) {
      throw new AppErrors('Rentals does not exists')
    }
    const dateNow = this.dateProvider.dateNow()
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    )
    if (daily <= 0) {
      daily = minimum_daily
    }
    const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)
    let total = 0
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }
    total += daily * car.daily_rate
    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)
    return rental
  }
}

export { DevolutionUseCase }
