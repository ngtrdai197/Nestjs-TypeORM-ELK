import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => {
            console.log(`configService.get<string>('POSTGRES_USER')`, configService.get<string>('POSTGRES_USER'))
            console.log(`configService.get<string>('POSTGRES_PASSWORD')`, configService.get<string>('POSTGRES_PASSWORD'))
            return ({
              type: 'postgres',
              host: configService.get<string>('POSTGRES_HOST'),
              port: configService.get<number>('PORT_DB'),
              username: configService.get<string>('POSTGRES_USER'),
              password: configService.get<string>('POSTGRES_PASSWORD'),
              database: configService.get<string>('POSTGRES_DB'),
              synchronize: false,
              entities,
              retryDelay: 5000,
              migrationsTableName: 'migrations_tb',
              migrations: ['dist/migrations/*.js'],
              cli: {
                migrationsDir: 'src/migrations',
              },
            })
          },
          imports: [ConfigModule],
          inject: [ConfigService],
        }),
      ],
    };
  }
}
