import { Injectable } from '@nestjs/common';
import { Ctx, Help, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { FarmlendService } from 'src/farmlend/farmlend.service';
import { TelegrafContext } from 'src/interfaces/context.interface';
import { PlanetHealthService } from 'src/planet-health/planet-health.service';
import { SkladZdorovoService } from 'src/sklad-zdorovo/sklad-zdorovo.service';
import { Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegrammService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private readonly farmlendService: FarmlendService,
    private readonly skladZdorovoService: SkladZdorovoService,
    private readonly planetHealthService: PlanetHealthService,
  ) {}
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Welcome');
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me some video';
  }

  @On('text')
  async onMessage(@Ctx() ctx: TelegrafContext) {
    // const response = await this.skladZdorovoService.find(ctx.text);
    // const response = await this.farmlendService.find(ctx.text);
    // const response = await this.planetHealthService.find(ctx.text);
    const response = await Promise.all([
      this.planetHealthService.find(ctx.text),
      this.skladZdorovoService.find(ctx.text),
    ]);
    const result = response
      .flat()
      .map((el) => ({
        ...el,
        price: parseInt(el.price.match(/[\d.,]+/g).join('')),
      }))
      .sort((a, b) => a.price - b.price);
    await ctx.reply(`You sent text ${JSON.stringify(result)}`);
  }
}
