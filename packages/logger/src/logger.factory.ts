import { AsyncTrackerService } from '@kikar/async-tracker';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ulid } from 'ulid';
import { Logger as WinstonLogger, createLogger, format, transports } from 'winston';
import { Logger } from './logger';
import { loggerConfig } from './logger.config';
import { ServerEnvironmentType } from './logger.constants';

@Injectable()
export class LoggerFactory {
  private logger: WinstonLogger;
  private id = ulid().toLowerCase();

  constructor(private readonly asyncTracker: AsyncTrackerService, @Inject(loggerConfig.KEY) config: ConfigType<typeof loggerConfig>) {
    this.logger = createLogger({ level: this.getLoggerMinLevel(config), format: format.json() });
    this.logger.add(new transports.Console({ format: format.combine(...this.getConsoleFormat(config)) }));
  }

  public getLogger(serviceName: string): Logger {
    return new Logger(serviceName, this.id, this.logger, this.asyncTracker);
  }

  private getLoggerMinLevel(config: ConfigType<typeof loggerConfig>): string {
    return config.level;
  }

  private getConsoleFormat(config: ConfigType<typeof loggerConfig>): Parameters<typeof format.combine> {
    return config.env &&
      [
        ServerEnvironmentType.Development,
        ServerEnvironmentType.Staging,
        ServerEnvironmentType.Beta,
        ServerEnvironmentType.Production,
        ServerEnvironmentType.Testing,
      ].includes(config.env)
      ? [format.timestamp(), format.json()]
      : [format.colorize(), format.simple()];
  }
}
