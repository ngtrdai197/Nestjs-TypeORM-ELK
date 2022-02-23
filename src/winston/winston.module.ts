import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  WinstonModule as BaseWinstonModule,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as logstash from 'winston-logstash-transport';

@Module({
  imports: [
    BaseWinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const transports = Boolean(configService.get<boolean>('IS_PRODUCTION'))
          ? [
              new winston.transports.DailyRotateFile({
                filename: 'application-%DATE%.log',
                zippedArchive: true,
                maxSize: '20mb',
                datePattern: 'YYYY-MM-DD',
                dirname: './logs',
              }),
            ]
          : [
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
            ];
        const options: WinstonModuleOptions = {
          level: 'info',
          format: winston.format.json(),
          transports: [
            ...transports,
            new logstash.LogstashTransport({
              host: 'typeorm-logstash',
              port: 1514,
            }),
          ],
        };
        return options;
      },
      inject: [ConfigService],
    }),
  ],
})
export class WinstonModule {}
