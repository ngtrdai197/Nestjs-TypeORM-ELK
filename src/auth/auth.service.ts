import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dtos';
import { AuthRepository } from './auth.repository';
import { CredentialDto } from './dtos/credential.dto';
import { IPayload } from './interfaces/payload.interface';
import { User } from '@/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string) {
    return await this.authRepository.findOne({ email });
  }

  public async signUp(newUser: CreateUserDto): Promise<User> {
    const found = await this.authRepository.findOne({ email: newUser.email });
    if (found)
      throw new ConflictException({
        statusCode: 409,
        msg: 'Email already exists',
      });

    const record = new User();
    const salt = await genSalt();
    record.email = newUser.email;
    record.firstName = newUser.firstName;
    record.lastName = newUser.lastName;
    record.password = await this.hashPassword(newUser.password, salt);
    record.salt = salt;
    return this.authRepository.save(record);
  }

  public async signIn(credential: CredentialDto) {
    const { email, password } = credential;
    const found = await this.authRepository.findOne(
      {
        email,
      },
      {
        select: ['email', 'password', 'salt', 'firstName', 'lastName'],
      },
    );
    if (!found)
      throw new UnauthorizedException({
        statusCode: 401,
        msg: 'Credential invalid. Check again!',
      });
    const isValid = await found.validatePassword(password);
    if (!isValid)
      throw new UnauthorizedException({
        statusCode: 401,
        msg: 'Credential invalid. Check again!',
      });
    return {
      token: await this.genToken(found),
    };
  }

  private hashPassword = async (password: string, salt: string) =>
    hash(password, salt);

  private genToken = async (currentUser: User): Promise<string> => {
    const { id, email, firstName, lastName } = currentUser;
    const payload: IPayload = {
      id,
      email,
      firstName,
      lastName,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: 3600,
      secret: 'SECRET_KEY',
    });
  };
}
