import { AppErrors } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository';
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider';
import { inject } from 'tsyringe'
import { IRentalRepository } from '../infra/typeorm/repositories/IRentalRepository';

interface IRequest {
  id: string
  user_id: string
}

class DevolutionUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalsRepository: IRentalRepository,
    @inject('CarsRepository')
    private CarsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }
  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id)
    if (!rental) {
      throw new AppErrors('Rentals does not exists')
    }
  }
}

export {
  DevolutionUseCase
}