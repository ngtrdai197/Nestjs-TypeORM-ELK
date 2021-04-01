import { EntityRepository, Connection } from 'typeorm';

import { BaseRepository } from '@/common/services/base.repository';
import { UserEntity } from '@/user/user.entity';

@EntityRepository(UserEntity)
export class AuthRepository extends BaseRepository<UserEntity> {
  constructor(protected readonly connection: Connection) {
    super(connection);
  }
}
