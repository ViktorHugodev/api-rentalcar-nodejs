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
    speficiations,
    id,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
      speficiations,
      id,
    })
    await this.repository.save(car)
    return car
  }

  async listAvaible(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('avaible = :avaible', { avaible: true })

    if (brand) carsQuery.andWhere('c.brand = :brand', { brand })
    if (name) carsQuery.andWhere('c.name = :name', { name })
    if (category_id)
      carsQuery.andWhere('c.category_id = :category_id', { category_id })

    const cars = await carsQuery.getMany()
    return cars
  }

  findByName(name: string): Promise<Car> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({ id })
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate })
    return car
  }
}
export { CarsRepository }
