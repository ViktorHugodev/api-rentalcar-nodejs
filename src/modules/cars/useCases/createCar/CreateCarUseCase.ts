import { inject, injectable } from 'tsyringe'

import { AppErrors } from '@errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
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
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    )
    console.log(carAlreadyExists)
    if (carAlreadyExists) {
      throw new AppErrors('Car already exists')
    }
    console.log(carAlreadyExists)
    const car = await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
    })
    console.log(car)
    return car
  }
}

export { CreateCarUseCase }
