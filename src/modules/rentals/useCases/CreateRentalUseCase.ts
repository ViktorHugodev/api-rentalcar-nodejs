import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider'

import { RentalCar } from '../infra/typeorm/entities/RentalCar'
import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository'

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<RentalCar> {

    const minimumHoursForRent = 24
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    )
    if (carUnavailable) {
      throw new AppErrors('Car is not available')
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    )
    console.log('RENTALOPENM', rentalOpenToUser)
    if (rentalOpenToUser) {
      throw new AppErrors('Rental is not available for this user right now')
    }

    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    )
    if (compare < minimumHoursForRent) {
      throw new AppErrors('Invalid return time!')
    }
    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
