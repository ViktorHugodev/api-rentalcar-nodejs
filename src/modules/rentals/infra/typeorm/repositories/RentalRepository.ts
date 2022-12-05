import { Repository } from 'typeorm'

import AppDataSource from '@shared/infra/database/data-source'

import { RentalCar } from '../entities/RentalCar'
import { ICreatedRentalDTO, IRentalRepository } from './IRentalRepository'

class RentalRepository implements IRentalRepository {
  private repository: Repository<RentalCar>
  constructor() {
    this.repository = AppDataSource.getRepository(RentalCar)
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreatedRentalDTO): Promise<RentalCar> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    })
    await this.repository.save(rental)
    return rental
  }
  async findOpenRentalByCar(car_id: string): Promise<RentalCar> {
    const car = await this.repository.findOneBy({ car_id })
    return car
  }
  async findOpenRentalByUser(user_id: string): Promise<RentalCar> {
    const user = await this.repository.findOneBy({ user_id })
    return user
  }
  async findById(id: string): Promise<RentalCar> {
    const rental = await this.repository.findOneBy({ id })
    return rental
  }
}

export { RentalRepository }
