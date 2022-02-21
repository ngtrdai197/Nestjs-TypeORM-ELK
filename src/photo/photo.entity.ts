import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from '@/user/user.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('photo')
export class PhotoEntity extends BaseEntity {
  @Column({ name: 'url_photo' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @Column({ name: 'user_id' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ManyToOne(
    () => UserEntity,
    user => user.photos,
    {
      eager: false,
    },
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Promise<UserEntity>;
}
