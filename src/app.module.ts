import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nest-db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest-instagram',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
