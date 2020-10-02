import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  create(newUser: CreateUserDto): Promise<User> {
    return this.userRepository.save(newUser)
  }

  async update(update: EditUserDto): Promise<User> {
    await this.userRepository.update(update.id, update)
    return this.userRepository.findOne(update.id)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
