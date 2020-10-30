import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { EditUserDto, CreateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return this.userService.create(newUser);
  }

  @Put()
  async updateUser(@Body() editUser: EditUserDto) {
    return this.userService.update(editUser);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}
