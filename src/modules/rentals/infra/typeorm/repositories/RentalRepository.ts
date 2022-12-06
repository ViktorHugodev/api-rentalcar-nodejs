import { IsNull, Repository } from 'typeorm'

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
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreatedRentalDTO): Promise<RentalCar> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    })
    await this.repository.save(rental)
    return rental
  }
  async findOpenRentalByCar(car_id: string): Promise<RentalCar> {
    const car = await this.repository.findOne({
      where: {
        car_id,
        end_date: IsNull(),
      },
    })
    return car
  }
  async findOpenRentalByUser(user_id: string): Promise<RentalCar> {
    const user = await this.repository.findOne({
      where: {
        user_id,
        end_date: IsNull(),
      },
    })
    return user
  }
  async findById(id: string): Promise<RentalCar> {
    const rental = await this.repository.findOneBy({ id })
    return rental
  }
}

export { RentalRepository }
