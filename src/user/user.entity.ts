import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Photo } from '../photo/photo.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(
    () => Photo,
    photo => photo.userId,
    { nullable: true, cascade: true },
  )
  photoIds: number[];
}
