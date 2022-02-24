import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';

import { AppModule } from './app.module';
import { CatchExceptionsFilter } from '@/common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new CatchExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT_SERVER');
  await app.listen(PORT);
  Logger.log(
    `🚀  Server is listening on port ${chalk.hex('#87e8de').bold(`${PORT}`)}`,
    'Bootstrap',
  );
}
bootstrap();
