import { Injectable } from '@nestjs/common';
import { Ctx, Help, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { FarmlendService } from 'src/farmlend/farmlend.service';
import { TelegrafContext } from 'src/interfaces/context.interface';
import { SkladZdorovoService } from 'src/sklad-zdorovo/sklad-zdorovo.service';
import { Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegrammService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private readonly farmlendService: FarmlendService,
    private readonly skladZdorovoService: SkladZdorovoService,
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
    const response = await this.farmlendService.find(ctx.text);
    await ctx.reply(`You sent text ${JSON.stringify(response)}`);
  }
}
