import { EntityRepository, Connection } from 'typeorm';

import { BaseRepository } from '@/common/services/base.repository';
import { User } from '@/user/user.entity';

@EntityRepository(User)
export class AuthRepository extends BaseRepository<User> {
  constructor(protected readonly connection: Connection) {
    super(connection);
  }
}
