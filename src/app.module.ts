import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TelegrammModule } from './telegramm/telegramm.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TelegrammModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
