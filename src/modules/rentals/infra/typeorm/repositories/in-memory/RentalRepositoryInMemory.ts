import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { RentalCar } from '../../entities/RentalCar'
import { ICreatedRentalDTO, IRentalRepository } from '../IRentalRepository'

class RentalRepositoryInMemory implements IRentalRepository {
  rentals: RentalCar[] = []

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreatedRentalDTO): Promise<RentalCar> {
    const rental = new RentalCar()
    Object.assign(rental, {
      car_id,
      user_id,
    })
    this.rentals.push(rental)
    return rental
  }
  async findOpenRentalByCar(car_id: string): Promise<RentalCar> {
    const carAvailable = this.rentals.find(
      (car) => car.id === car_id && car.end_date == null
    )
    return carAvailable
  }
  async findOpenRentalByUser(user_id: string): Promise<RentalCar> {
    const userOpenToRent = this.rentals.find(
      (user) => user.id === user_id && user.end_date == null
    )
    return userOpenToRent
  }
}

export { RentalRepositoryInMemory }
