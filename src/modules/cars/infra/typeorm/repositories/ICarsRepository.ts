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
  listAvaible(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>
  findByName(name: string): Promise<Car>
  findById(id: string): Promise<Car>
  updateAvailable(id: string, avaible: boolean): Promise<void>
  findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarsRepository }
