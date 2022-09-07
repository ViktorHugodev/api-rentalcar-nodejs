import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

// @Entity('rentals')
class RentalCar {
  // @PrimaryColumn()
  id?: string

  car_id: string
  user_id: string

  // @CreateDateColumn()
  start_date: Date

  end_date: Date
  expected_return_date: Date
  
  // @CreateDateColumn()
  created_at: Date
  
  // @CreateDateColumn()
  updated_at: Date

  // @Column()
  total: number

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { RentalCar }
