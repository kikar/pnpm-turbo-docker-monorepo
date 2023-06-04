import { AsyncTrackerModule } from "@kikar/async-tracker";
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loggerConfig } from './logger.config';
import { LoggerFactory } from './logger.factory';

@Module({
  imports: [AsyncTrackerModule, ConfigModule.forFeature(loggerConfig)],
  providers: [LoggerFactory],
  exports: [LoggerFactory],
})
export class LoggerModule {}
