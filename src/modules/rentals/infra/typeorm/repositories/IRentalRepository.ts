import { RentalCar } from '../entities/RentalCar'

interface ICreatedRentalDTO {
  car_id: string
  user_id: string
  expected_return_date: Date
  id?: string
  end_date?: Date
  total?: number
}

interface IRentalRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreatedRentalDTO): Promise<RentalCar>
  findOpenRentalByCar(car_id: string): Promise<RentalCar>
  findOpenRentalByUser(user_id: string): Promise<RentalCar>
  findById(id: string): Promise<RentalCar>
}

export { IRentalRepository, ICreatedRentalDTO }
