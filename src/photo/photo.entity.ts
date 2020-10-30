import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'url_photo' })
  url: string;

  @ManyToOne(
    () => User,
    user => user.photos,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
