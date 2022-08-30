import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  isAdmin: boolean

  @Column()
  driver_license: string

  @CreateDateColumn()
  created_at: string

  @Column()
  avatar: string

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { User }
