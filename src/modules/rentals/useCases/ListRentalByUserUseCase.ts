import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'

import { RentalCar } from '../infra/typeorm/entities/RentalCar'
import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository'

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalsRepository: IRentalRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute(user_id: string): Promise<RentalCar[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id)
    return rentalsByUser
  }
}

export { ListRentalByUserUseCase }
