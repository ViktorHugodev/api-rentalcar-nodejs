import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'

interface IRequest {
  brand?: string
  category_id?: string
  name?: string
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {

    const cars = await this.carsRepository.listAvaible(brand, name, category_id)
    return cars
  }
}
export { ListCarsUseCase }
