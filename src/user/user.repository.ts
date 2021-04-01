import {
  Connection,
  EntityRepository,
  getRepository,
  QueryRunner,
} from 'typeorm';

import { CreateUserDto, EditUserDto } from './dtos';
import { UserEntity } from './user.entity';
import { BaseRepository } from '@/common/services/base.repository';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(protected readonly connection: Connection) {
    super(connection);
  }

  public async createUser(options: {
    newUser: CreateUserDto;
    hasTransaction?: boolean;
  }): Promise<UserEntity | void> {
    const { newUser, hasTransaction = false } = options;
    if (!hasTransaction) {
      return this.create(newUser);
    }
    const handler = (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      manager.save(UserEntity, newUser);
    };
    return this.performActionInTransaction(handler);
  }

  public async updateUser(options: {
    editUser: EditUserDto;
    hasTransaction?: boolean;
  }) {
    const { editUser, hasTransaction = false } = options;
    if (!hasTransaction) {
      const { affected } = await this.update({ id: editUser.id }, editUser);
      if (affected) {
        return true;
      }
      return false;
    }
    const handler = (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      manager.update(UserEntity, editUser.id, editUser);
    };
    return this.performActionInTransaction(handler);
  }

  public async deleteUser(options: {
    id: string;
    hasTransaction?: boolean;
  }): Promise<boolean | void> {
    const { id, hasTransaction = false } = options;
    if (!hasTransaction) {
      const { affected } = await this.delete(id);
      if (affected) {
        return true;
      }
      return false;
    }
    const handler = (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      manager.delete(UserEntity, id);
    };
    return this.performActionInTransaction(handler);
  }

  public getUser(id: string): Promise<UserEntity> {
    return getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  public async getUsers() {
    return getRepository(UserEntity)
      .createQueryBuilder()
      .select()
      .getMany();
  }
}
