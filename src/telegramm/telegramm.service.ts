import { Injectable } from '@nestjs/common';
import {
  Ctx,
  Help,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interfaces/context.interface';
import { Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegrammService {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}
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
    await ctx.reply(`You sent text ${ctx.text}`);
  }

  @On('video')
  async onVideo(
    @Ctx() ctx: TelegrafContext,
    @Message('video') video: { file_id: string },
  ) {
    const link = await ctx.telegram.getFileLink(video.file_id);
    await ctx.reply(JSON.stringify(link));
    // await ctx.reply(JSON.stringify(ctx.message.video));
  }
}
