import { Injectable } from '@nestjs/common';

import { CreateUserDto, EditUserDto } from './dtos';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(newUser: CreateUserDto): Promise<UserEntity | void> {
    return this.userRepository.createUser({ newUser, hasTransaction: true });
  }

  public async update(update: EditUserDto): Promise<boolean | void> {
    return this.userRepository.updateUser({
      editUser: update,
      hasTransaction: true,
    });
  }

  public getUsers(): Promise<UserEntity[]> {
    return this.userRepository.getUsers();
  }

  public getUserById(id: string): Promise<UserEntity> {
    return this.userRepository.getUser(id);
  }

  public async remove(id: string): Promise<boolean | void> {
    return this.userRepository.deleteUser({ id, hasTransaction: true });
  }

  public getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }
}
