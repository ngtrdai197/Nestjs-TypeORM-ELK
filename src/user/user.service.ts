import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';

import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './user.entity';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  async create(newUser: CreateUserDto) {
    const handler = (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      manager.save(User, newUser);
    };
    await this.performActionInTransaction(handler);
  }

  async update(update: EditUserDto) {
    const handler = (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      manager.update(User, update.id, update);
    };
    await this.performActionInTransaction(handler);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async remove(id: string): Promise<void> {
    const handler = (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      manager.delete(User, id);
    };
    await this.performActionInTransaction(handler);
  }
}
