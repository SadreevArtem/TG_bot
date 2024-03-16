import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as UserAgent from 'user-agents';

@Injectable()
export class SkladZdorovoService {
  constructor() {}
  async find(product: string) {
    const userAgent = new UserAgent({ deviceCategory: 'desktop' });
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080',
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    try {
      const page = await browser.newPage();
      await page.setUserAgent(userAgent.toString());
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto(
          encodeURI(
            `https://sklad-zdorovo.ru/catalog?q=${product}&sort=price_asc`,
          ),
        ),
      ]);
      return await page.$$eval('.goods-grid__inner .ui-card', (resultItems) => {
        return resultItems.map((resultItem) => {
          const url = resultItem.querySelector('a')?.href;
          const title = resultItem.querySelector(
            'span[itemprop="name"]',
          )?.textContent;
          const price = resultItem.querySelector(
            '.ui-button__content > span',
          )?.textContent;
          return {
            url,
            title,
            price,
          };
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }
  }
}
