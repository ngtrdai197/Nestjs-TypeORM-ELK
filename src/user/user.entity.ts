import { Entity, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { hash } from 'bcryptjs';

import { PhotoEntity } from '../photo/photo.entity';
import { BaseEntity } from '@/common/entities/base.entity';
import { PhotoService } from '@/photo/photo.service';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ name: 'email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column({ name: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ name: 'salt' })
  @IsString()
  @IsNotEmpty() salt: string;

  @Column({ name: 'first_name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ name: 'last_name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @Column({ default: true, name: 'website' })
  @IsString()
  @IsOptional()
  website?: string;

  @OneToMany(
    () => PhotoEntity,
    photo => photo.user,
    { nullable: true, cascade: true },
  )
  photos?: Promise<PhotoService[]>;

  public async validatePassword(password: string) {
    const hashed = await hash(password, this.salt);
    return this.password === hashed;
  }
}
