import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 300, nullable: true })
  createdBy?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Column({ name: 'updated_by', type: 'varchar', length: 300, nullable: true })
  updatedBy?: string;
}
