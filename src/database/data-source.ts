import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Category } from '../modules/cars/model/Category'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  synchronize: false,
  logging: false,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  entities: [Category],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
})
export function createConnection(host = 'database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
