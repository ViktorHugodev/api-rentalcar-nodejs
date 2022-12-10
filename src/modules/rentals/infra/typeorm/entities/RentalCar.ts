import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'

@Entity('rentals')
class RentalCar {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car

  @Column()
  car_id: string
  @Column()
  user_id: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  expected_return_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  total: number

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { RentalCar }
