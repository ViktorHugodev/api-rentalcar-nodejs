import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('cars')
class Car {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  brand: string

  @Column()
  category_id: string

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  daily_rate: number

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Car as Cars }
