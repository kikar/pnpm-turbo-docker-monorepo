import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { ulid } from 'ulid';
import { CORRELATION_ID, REQUEST_ID } from './async-tracker.constants';
import { AsyncTrackerService } from './async-tracker.service';

@Injectable()
export class AsyncTrackerMiddleware implements NestMiddleware {
  constructor(private readonly asyncTracker: AsyncTrackerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    return this.asyncTracker.runWithAsyncTracker(() => {
      this.asyncTracker.setValue(REQUEST_ID, ulid());
      this.asyncTracker.setValue(CORRELATION_ID, req.headers[CORRELATION_ID] || ulid());
      return next();
    });
  }
}
