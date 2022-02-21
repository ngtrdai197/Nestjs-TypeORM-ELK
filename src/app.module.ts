import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { WinstonModule } from './winston/winston.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    DatabaseModule.forRoot(new Logger('DATABASE', true)),
    WinstonModule,
    PhotoModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {
    Logger.debug(process.env.NODE_ENV, 'NODE_ENV');
  }
}
