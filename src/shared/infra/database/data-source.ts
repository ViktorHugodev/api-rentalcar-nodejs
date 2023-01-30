import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { UsersToken } from '@modules/accounts/infra/typeorm/entities/UsersToken'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { RentalCar } from '@modules/rentals/infra/typeorm/entities/RentalCar'

// Create Table
// yarn typeorm migration:create ./src/shared/infra/database/migrations/CreateUser

// Run migrations
// yarn typeorm migration:run -d ./src/shared/infra/database/data-source.ts
const AppDataSource = new DataSource({
  type: 'postgres',
  port: 6805,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  entities: [
    Category,
    Specification,
    User,
    Car,
    CarImage,
    RentalCar,
    UsersToken,
  ],
  migrations: ['./dist/shared/infra/database/migrations/*.js'],
})
export function createConnection(): Promise<DataSource> {
  return AppDataSource.initialize()
}

export default AppDataSource
