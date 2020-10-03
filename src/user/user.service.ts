import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(newUser: CreateUserDto): Promise<User> {
    return this.userRepo.save(newUser);
  }

  async update(update: EditUserDto): Promise<User> {
    await this.userRepo.update(update.id, update);
    return this.userRepo.findOne(update.id);
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
    await this.userRepo.delete(id);
  }
}
