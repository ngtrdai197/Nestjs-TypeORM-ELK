import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import chalk from 'chalk';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT_SERVER');
  console.log('PORT :>> ', PORT);
  await app.listen(PORT);
  // Logger.log(
  //   `🚀  Server is listening on port ${chalk.hex(`#87e8de`).bold(`${port}`)}`,
  //   'Bootstrap',
  // );
}
bootstrap();
