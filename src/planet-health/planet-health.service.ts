import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PlanetHealthService {
  constructor() {}
  async find(product: string) {
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint:
          'ws://127.0.0.1:9222/devtools/browser/89a41c35-9b00-4025-8645-e9f3473295cf',
      });
      const page = await browser.newPage();
      // await page.waitForNetworkIdle({ idleTime: 1000 });
      // await page.goto('https://planetazdorovo.ru/tyumen/');
      // await page.waitForSelector('.input-field');
      // await page.type('.input-field > input', product);
      // await page.waitForNetworkIdle({ idleTime: 1000 });
      // const products = await page.evaluate(() => {
      //   const elems = document.querySelectorAll('.card-list .item-card');
      //   return Array.from(elems).map((resultItem) => {
      //     const url = resultItem.querySelector('a')?.href;
      //     const title = resultItem.querySelector('.this-full')?.textContent;
      //     const price = resultItem.querySelector(
      //       '.item-card-price-number',
      //     )?.textContent;
      //     return {
      //       url,
      //       title,
      //       price,
      //     };
      //   });
      // });
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        // page.goto(encodeURI('https://planetazdorovo.ru/tyumen')),
        page.goto(
          encodeURI(
            `https://planetazdorovo.ru/search/?sort=price&q=${product}`,
          ),
          { timeout: 500 },
        ),
      ]);
      const products = await page.$$eval(
        '.card-list .item-card',
        (resultItems) => {
          return resultItems.map((resultItem) => {
            const url = resultItem.querySelector('a')?.href;
            const title = resultItem.querySelector('.this-full')?.textContent;
            const price = resultItem.querySelector(
              '.item-card-price-number',
            )?.textContent;
            return {
              url,
              title,
              price,
            };
          });
        },
      );
      await page.close();
      return products.slice(0, 10);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finish');
    }
  }
}
