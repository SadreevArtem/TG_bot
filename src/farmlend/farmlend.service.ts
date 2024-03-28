import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class FarmlendService {
  constructor() {}

  async find(product: string) {
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint:
          'ws://127.0.0.1:9222/devtools/browser/d6768c9d-1b02-4642-a1d2-1ec4734aee98',
      });
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (
          req.resourceType() == 'stylesheet' ||
          req.resourceType() == 'font' ||
          req.resourceType() == 'image'
          // req.resourceType() == 'script'
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });
      await Promise.all([
        page.waitForNavigation(),
        page.goto(
          encodeURI(
            `https://farmlend.ru/tyumen/search?order_dir=ASC&order_by=price&keyword=${product}`,
          ),
          { waitUntil: 'domcontentloaded' },
        ),
      ]);

      const products = await page.$$eval('.products .p-item', (resultItems) => {
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
      await page.close();
      return products.slice(0, 10);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finish');
    }
  }
}
