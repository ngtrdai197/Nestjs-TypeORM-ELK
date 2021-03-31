import { Entity, Column, OneToMany } from 'typeorm';
import { hash } from 'bcryptjs';

import { Photo } from '../photo/photo.entity';
import { BaseEntity } from '@/common/models/base.entity';

@Entity('user')
export class User extends BaseEntity{
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'salt' })
  salt: string;

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
  photoIds: string[];

  public async validatePassword(password: string) {
    const hashed = await hash(password, this.salt);
    return this.password === hashed;
  }
}
