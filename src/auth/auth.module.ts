import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [AuthService, JwtStrategyService],
  controllers: [AuthController],
})
export class AuthModule {}
