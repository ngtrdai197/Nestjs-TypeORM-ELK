import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { EditUserDto, CreateUserDto } from './dtos';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

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
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@CurrentUser() currentUser: UserDto) {
    console.log('currentUser :>> ', currentUser);
    return this.userService.getUsers();
  }
}
