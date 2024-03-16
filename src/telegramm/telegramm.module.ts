import { Module } from '@nestjs/common';
import { TelegrammService } from './telegramm.service';
import { FarmlendService } from 'src/farmlend/farmlend.service';
import { SkladZdorovoService } from 'src/sklad-zdorovo/sklad-zdorovo.service';

@Module({
  providers: [TelegrammService, FarmlendService, SkladZdorovoService],
})
export class TelegrammModule {}
