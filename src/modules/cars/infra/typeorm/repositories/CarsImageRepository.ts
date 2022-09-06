import { Repository } from 'typeorm'

import AppDataSource from '@shared/infra/database/data-source'

import { CarImage } from '../entities/CarImage'
import { ICarsImageRepository } from './ICarsImageRepository'

class CarImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage)
  }
  async create(car_image: string, car_id: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, car_image })
    await this.repository.save(carImage)
    return carImage
  }
}

export { CarImageRepository }
