import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { AppErrors } from '@errors/AppError'

import { RentalCar } from '../infra/typeorm/entities/RentalCar'
import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository'

dayjs.extend(utc)
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

    if (rentalOpenToUser) {
      throw new AppErrors('Rental is not available for this user right now')
    }

    const dateNow = dayjs().utc().local().format()
    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format()

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours')
    if (compare < minimumHoursForRent) {
      throw new AppErrors('Invalid return time!')
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
