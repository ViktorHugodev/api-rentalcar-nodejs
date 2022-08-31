import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}
@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    brand,
    category_id,
    daily_rate,
    license_plate,
    fine_amount,
    description,
  }: IRequest): Promise<void> {
    this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
    })
  }
}

export { CreateCarUseCase }
