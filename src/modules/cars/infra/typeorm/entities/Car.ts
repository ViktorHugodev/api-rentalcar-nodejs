import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import { Category } from './Category'

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

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  avaible: boolean

  @Column()
  daily_rate: number

  @CreateDateColumn()
  created_at: Date

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'speficiations_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  speficiations: Specification[]
  constructor() {
    if (!this.id) {
      this.id = uuidv4()
      this.avaible = true
    }
  }
}

export { Car }
