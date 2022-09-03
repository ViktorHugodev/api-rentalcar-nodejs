import { Repository } from 'typeorm'

import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO'
import AppDataSource from '@shared/infra/database/data-source'

import { Car } from '../entities/Car'
import { ICarsRepository } from './ICarsRepository'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>
  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }
  async create({
    name,
    brand,
    category_id,
    daily_rate,
    license_plate,
    fine_amount,
    description,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
    })
    await this.repository.save(car)
    return car
  }
  listAvaible(): Promise<Car[]> {
    throw new Error('Method not implemented.')
  }
  findByName(name: string): Promise<Car> {
    throw new Error('Method not implemented.')
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate })
    return car
  }
}
export { CarsRepository }
