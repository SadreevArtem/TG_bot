import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as UserAgent from 'user-agents';

@Injectable()
export class FarmlendService {
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
            `https://farmlend.ru/tyumen/search?order_dir=ASC&order_by=price&keyword=${product}`,
          ),
        ),
      ]);

      return await page.$$eval('.products .p-item', (resultItems) => {
        return resultItems.map((resultItem) => {
          const url = resultItem.querySelector('a')?.href;
          const title = resultItem.querySelector('.pi-title')?.textContent;
          const price = resultItem.querySelector('.pi-current')?.textContent;
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
