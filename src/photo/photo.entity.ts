import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@/user/user.entity';
import { BaseEntity } from '@/common/models/base.entity';

@Entity('photo')
export class Photo extends BaseEntity{

  @Column({ name: 'url_photo' })
  url: string;

  @ManyToOne(
    () => User,
    user => user.photoIds,
  )
  @JoinColumn({ name: 'user_id' })
  userId: string;
}
