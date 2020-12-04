import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { DatabaseModule } from './common/database/database.module';
import { User } from './user/user.entity';
import { Photo } from './photo/photo.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule.forRoot([User, Photo]),
    UserModule,
    PhotoModule,
    AuthModule,
  ],
})
export class AppModule {}
