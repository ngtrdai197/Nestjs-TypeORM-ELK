import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    UserModule,
    PhotoModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor() {
    Logger.debug(process.env.NODE_ENV, 'NODE_ENV');
  }
}
