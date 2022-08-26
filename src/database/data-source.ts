import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Category } from '../modules/cars/entities/Category'

const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  entities: [Category],
  migrations: ['./src/database/migrations/*.ts'],
})
export function createConnection(host = 'database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
