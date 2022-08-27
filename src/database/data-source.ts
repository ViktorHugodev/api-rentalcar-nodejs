import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Category } from '../modules/cars/entities/Category'
import { Specification } from '../modules/cars/entities/Specification'
// Create Table
// yarn typeorm migration:create ./src/database/migrations/CreateUser

// Run migrations
// yarn typeorm migration:run -d ./src/database/data-source.ts
const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  entities: [Category, Specification],
  migrations: ['./src/database/migrations/*.ts'],
})
export function createConnection(host = 'database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
