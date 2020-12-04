import { Injectable } from '@nestjs/common';

import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(newUser: CreateUserDto): Promise<User | void> {
    return this.userRepository.createUser({ newUser, hasTransaction: true });
  }

  async update(update: EditUserDto): Promise<boolean | void> {
    return this.userRepository.updateUser({
      editUser: update,
      hasTransaction: true,
    });
  }

  public getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  public getUserById(id: number): Promise<User> {
    return this.userRepository.getUser(id);
  }

  public async remove(id: number): Promise<boolean | void> {
    return this.userRepository.deleteUser({ id, hasTransaction: true });
  }
}
