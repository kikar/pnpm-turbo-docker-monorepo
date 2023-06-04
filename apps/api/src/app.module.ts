import { LoggerModule } from '@kikar/logger';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoggerModule],
  providers: [],
  exports: [],
})
export class AppModule {}
