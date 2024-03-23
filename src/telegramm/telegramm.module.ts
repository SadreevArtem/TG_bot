import { Module } from '@nestjs/common';
import { TelegrammService } from './telegramm.service';
import { FarmlendService } from 'src/farmlend/farmlend.service';
import { SkladZdorovoService } from 'src/sklad-zdorovo/sklad-zdorovo.service';
import { PlanetHealthService } from 'src/planet-health/planet-health.service';

@Module({
  providers: [
    TelegrammService,
    FarmlendService,
    SkladZdorovoService,
    PlanetHealthService,
  ],
})
export class TelegrammModule {}
