import { Module } from '@nestjs/common';
import { TelegrammService } from './telegramm.service';

@Module({
  providers: [TelegrammService],
})
export class TelegrammModule {}
