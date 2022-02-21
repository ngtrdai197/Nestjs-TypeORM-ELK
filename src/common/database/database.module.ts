import { DynamicModule, LoggerService, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from 'typeorm';
import { entities } from './entities';

class DBLogger implements Logger {
  private context = '[DB]';

  constructor(public logger: LoggerService) {}

  public logQuery(
    query: string,
    parameters?: any[] | undefined,
    _queryRunner?: import('typeorm').QueryRunner | undefined,
  ): void {
    this.log('log', query);
    this.log('log', parameters);
  }

  public logQueryError(
    error: string,
    query: string,
    parameters?: any[] | undefined,
    _queryRunner?: import('typeorm').QueryRunner | undefined,
  ): void {
    this.log('error', error);
    this.log('error', query);
    this.log('error', parameters);
  }

  public logQuerySlow(
    time: number,
    query: string,
    parameters?: any[] | undefined,
    _queryRunner?: import('typeorm').QueryRunner | undefined,
  ): void {
    this.log('warn', time + '=SLOW=' + query);
    parameters && this.log('warn', parameters);
  }

  public logSchemaBuild(
    message: string,
    _queryRunner?: import('typeorm').QueryRunner | undefined,
  ): void {
    this.log('log', message);
  }

  public logMigration(
    message: string,
    _queryRunner?: import('typeorm').QueryRunner | undefined,
  ): void {
    this.log('log', message);
  }

  public log(
    level: 'log' | 'info' | 'warn' | 'error',
    message: any,
    _queryRunner?: import('typeorm').QueryRunner | undefined,
  ): void {
    if (level === 'log') {
      this.logger.log(this.context + message);
    } else if (level === 'info') {
      this.logger.log(this.context + message);
    } else if (level === 'warn') {
      this.logger.warn(this.context + message);
    } else if (level === 'error') {
      this.logger.error(this.context + message);
    }
  }
}

@Module({})
export class DatabaseModule {
  static forRoot(logger: LoggerService): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => {
            return {
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
              logging: true,
              logger: new DBLogger(logger)
            };
          },
          imports: [ConfigModule],
          inject: [ConfigService],
        }),
      ],
    };
  }
}
