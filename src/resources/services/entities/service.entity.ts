import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string

  @Column({ type: 'integer', nullable: false })
  duration: number 

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number
}
