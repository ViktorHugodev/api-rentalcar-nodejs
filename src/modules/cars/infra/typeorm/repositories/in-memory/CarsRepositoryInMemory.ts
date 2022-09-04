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
  async findByName(name: string): Promise<Car> {
    const car = this.cars.find((car) => car.name === name)
    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate)
    return car
  }
  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id)
    return car
  }
  async listAvaible(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.avaible === true ||
        (brand && car.brand === brand) ||
        (name && car.name === name) ||
        (category_id && car.category_id === category_id)
      ) {
        return car
      }
      return null
    })

    return cars
  }
}

export { CarsRepositoryInMemory }
