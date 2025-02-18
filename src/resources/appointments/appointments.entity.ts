import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm'

import { Service } from 'src/resources/services/service.entity'
import { User } from '../user/entities/user.entity'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'service_id', type: 'uuid' })
  serviceId: string

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service

  @Column({ type: 'timestamp' })
  appointmentDate: Date

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
