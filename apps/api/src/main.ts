import { LoggerFactory } from '@kikar/logger';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function Main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['error'] });
  app.enableShutdownHooks();
  const logger = app.get(LoggerFactory).getLogger(Main.name);
  await app.listen(process.env.PORT || 3000);
  logger.info(`Listening on port ${process.env.PORT || 3000}`);
}
Main();
