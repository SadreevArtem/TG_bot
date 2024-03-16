import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TelegrammModule } from './telegramm/telegramm.module';
import configuration from './config/configuration';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafConfigService } from './config/telegramm.factory';
import { SkladZdorovoService } from './sklad-zdorovo/sklad-zdorovo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
    TelegrammModule,
  ],
  controllers: [AppController],
  providers: [AppService, SkladZdorovoService],
})
export class AppModule {}
