import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO'

import { Car } from '../entities/Car'

interface ICarsRepository {
  create({
    name,
    brand,
    category_id,
    daily_rate,
    license_plate,
    fine_amount,
    description,
  }: ICreateCarsDTO): Promise<Car>
  list(): Promise<Car[]>
  findByName(name: string): Promise<Car>

  findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarsRepository }
