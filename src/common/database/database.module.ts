import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { PhotoEntity } from '@/photo/photo.entity';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const entities: any[] = [UserEntity, PhotoEntity];
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('POSTGRES_HOST'),
            port: configService.get<number>('PORT_DB'),
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
            synchronize: true,
            entities,
            retryDelay: 5000,
          }),
          imports: [ConfigModule],
          inject: [ConfigService],
        }),
      ],
    };
  }
}
