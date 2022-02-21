import {
  ConflictException,
  Injectable,
  LoggerService,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { hash, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';

import { CreateUserDto } from '../user/dtos';
import { AuthRepository } from './auth.repository';
import { CredentialDto } from './dtos/credential.dto';
import { IPayload } from './interfaces/payload.interface';
import { UserEntity } from '@/user/user.entity';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(email: string) {
    return await this.authRepository.findOne({ email });
  }

  public async signUp(newUser: CreateUserDto): Promise<any> {
    this.logger.log(`INPUT_SIGNUP_FUNCTION => ${JSON.stringify(newUser)}`);
    const found = await this.authRepository.findOne({
      email: 'nguyendai.dev2@gmail.com',
    });
    if (found)
      throw new ConflictException({
        statusCode: 409,
        msg: 'Email already exists',
      });

    const record = new UserEntity();
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

  private genToken = async (currentUser: UserEntity): Promise<string> => {
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
