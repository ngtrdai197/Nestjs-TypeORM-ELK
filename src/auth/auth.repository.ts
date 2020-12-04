import { EntityRepository, Connection } from 'typeorm';

import { User } from '../user/user.entity';
import { BaseRepository } from '../common/services/base.repository';

@EntityRepository(User)
export class AuthRepository extends BaseRepository<User> {
  constructor(protected readonly connection: Connection) {
    super(connection);
  }
}
