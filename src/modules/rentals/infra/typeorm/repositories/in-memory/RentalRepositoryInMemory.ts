import { RentalCar } from '../../entities/RentalCar'
import { ICreatedRentalDTO, IRentalRepository } from '../IRentalRepository'

class RentalRepositoryInMemory implements IRentalRepository {
  findByUserId(user_id: string): Promise<RentalCar[]> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<RentalCar> {
    throw new Error('Method not implemented.')
  }
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
      expected_return_date,
      start_date: new Date(),
    })
    this.rentals.push(rental)
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<RentalCar> {
    return this.rentals.find((car) => car.car_id === car_id && !car.end_date)
  }

  async findOpenRentalByUser(user_id: string): Promise<RentalCar> {
    return this.rentals.find(
      (user) => user.user_id === user_id && !user.end_date
    )
  }
}

export { RentalRepositoryInMemory }
