import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

// Create Table
// yarn typeorm migration:create ./src/shared/infra/database/migrations/CreateUser

// Run migrations
// yarn typeorm migration:run -d ./src/shared/infra/database/data-source.ts
const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  entities: [Category, Specification, User, Car, CarImage],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
})
export function createConnection(host = 'database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
