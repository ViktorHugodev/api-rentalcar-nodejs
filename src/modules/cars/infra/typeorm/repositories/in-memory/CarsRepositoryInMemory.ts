import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO'

import { Car } from '../../entities/Car'
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
  }: ICreateCarsDTO): Promise<Car> {
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
    return car
  }
  list(): Promise<Car[]> {
    throw new Error('Method not implemented.')
  }
  async findByName(name: string): Promise<Car> {
    const car = this.cars.find((car) => car.name === name)
    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate)
    return car
  }
}

export { CarsRepositoryInMemory }
