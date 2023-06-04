import { AsyncTrackerService, STORE_PREFIX } from '@kikar/async-tracker';
import ms from 'ms';
import { Logger as WinstonLogger } from 'winston';

export class Logger {
  constructor(
    private readonly name: string,
    private readonly id: string,
    private readonly logger: WinstonLogger,
    private readonly asyncTracker: AsyncTrackerService,
  ) {}

  debug(msg: string): void {
    this.logger.debug(...this.getLogArgs(msg));
  }

  info(msg: string): void {
    this.logger.info(...this.getLogArgs(msg));
  }

  warn(msg: string): void {
    this.logger.warn(...this.getLogArgs(msg));
  }

  error(msg: string): void {
    this.logger.error(...this.getLogArgs(msg));
  }

  time(msg: string, startTime: number): void {
    this.info(`${msg} ${ms(Date.now() - startTime)}`);
  }

  private getLogArgs(msg: string): [msg: string, correlatedInfo: Record<string, unknown>] {
    return [`[${this.name}] ${msg}`, { ...this.asyncTracker.getLoggerInfo(), [`${STORE_PREFIX}instance-id`]: this.id }];
  }
}
