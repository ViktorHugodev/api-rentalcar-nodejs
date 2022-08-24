import 'reflect-metadata'
import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: 'database_ignite',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
})

dataSource.initialize()
