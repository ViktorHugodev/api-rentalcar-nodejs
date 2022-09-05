import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

interface ICreateCarsDTO {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  speficiations?: Specification[]
}

export { ICreateCarsDTO }
