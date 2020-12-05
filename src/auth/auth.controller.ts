import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from '@/user/dtos';
import { AuthService } from './auth.service';
import { CredentialDto } from './dtos/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body(new ValidationPipe()) createuser: CreateUserDto) {
    return this.authService.signUp(createuser);
  }

  @Post('sign-in')
  async signIn(@Body(new ValidationPipe()) credential: CredentialDto) {
    return this.authService.signIn(credential);
  }
}
