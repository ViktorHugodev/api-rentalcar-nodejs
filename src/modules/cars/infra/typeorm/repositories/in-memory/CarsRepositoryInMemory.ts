import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO'

import { Cars as Car } from '../../entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []
  async create({
    name,
    brand,
    category_id,
    daily_rate,
    license_plate,
    fine_amount,
    description,
  }: ICreateCarsDTO): Promise<void> {
    const car = new Car()
    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
    })
    this.cars.push(car)
  }
  list(): Promise<Car[]> {
    throw new Error('Method not implemented.')
  }
  findByName(name: string): Promise<Car> {
    throw new Error('Method not implemented.')
  }
}

export { CarsRepositoryInMemory }
