import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity()
class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  username: string

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

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { User }
