import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PlanetHealthService {
  constructor() {}
  async find(product: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // puppeteer
    //   .use(
    //     StealthPlugin({
    //       enabledEvasions: new Set([
    //         'chrome.app',
    //         'chrome.csi',
    //         'defaultArgs',
    //         'navigator.plugins',
    //       ]),
    //     }),
    //   )
    //   // .use(AdblockerPlugin({ blockTrackers: true }))
    //   .launch({
    //     // args: [
    //     //   '--no-sandbox',
    //     //   '--disable-setuid-sandbox',
    //     //   '--disable-gpu',
    //     //   '--disable-dev-shm-usage',
    //     //   '--disable-web-security',
    //     //   '--disable-infobars',
    //     //   '--window-position=0,0',
    //     //   '--ignore-certifcate-errors',
    //     //   '--ignore-certifcate-errors-spki-list',
    //     // ],
    //     headless: false,
    //   })
    //   .then(async (browser) => {
    //     const page = await browser.newPage();
    //     await page.setUserAgent(userAgent);
    //     // await page.setCookie(
    //     //   ...[
    //     //     {
    //     //       name: 'qrator_jsid',
    //     //       value:
    //     //         '1710766926.308.hYU5ztE2c7RTVghW-af644fpi34qnnqenj97r0bvun25noihj',
    //     //     },
    //     //     {
    //     //       name: 'qrator_jsr',
    //     //       value:
    //     //         '1710766926.308.hYU5ztE2c7RTVghW-dg9daua11lkjvcle4v16khg31lt2qbeo-00',
    //     //     },
    //     //     // {
    //     //     //   name: ' show_bonus',
    //     //     //   value: '1',
    //     //     // },
    //     //     // {
    //     //     //   name: ' city_id',
    //     //     //   value: '212',
    //     //     // },
    //     //     // {
    //     //     //   name: ' city_xml',
    //     //     //   value: '51',
    //     //     // },
    //     //     // {
    //     //     //   name: ' city',
    //     //     //   value: '%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%8C',
    //     //     // },
    //     //     // {
    //     //     //   name: ' city_code',
    //     //     //   value: 'tyumen',
    //     //     // },
    //     //     // {
    //     //     //   name: ' help_phone',
    //     //     //   value: '%283452%29%2054-93-03',
    //     //     // },
    //     //     // {
    //     //     //   name: ' order_phone',
    //     //     //   value: '8%20%283452%29%2054-99-77',
    //     //     // },
    //     //     // {
    //     //     //   name: ' region',
    //     //     //   value: '13',
    //     //     // },
    //     //     // {
    //     //     //   name: ' timezone',
    //     //     //   value: '18000',
    //     //     // },
    //     //     // {
    //     //     //   name: ' region_id',
    //     //     //   value: '30',
    //     //     // },
    //     //     // {
    //     //     //   name: ' IS_CITY_CHANGE',
    //     //     //   value: '1',
    //     //     // },
    //     //     // // {
    //     //     // //   name: ' _gcl_au',
    //     //     // //   value: '1.1.982767541.1710764492',
    //     //     // // },
    //     //     // {
    //     //     //   name: ' BX_USER_ID',
    //     //     //   value: '9d4bc4bd3540d6d3a78a150acff45210',
    //     //     // },
    //     //     // // {
    //     //     // //   name: ' _gid',
    //     //     // //   value: 'GA1.2.1034986497.1710764493',
    //     //     // // },
    //     //     // {
    //     //     //   name: ' BITRIX_CONVERSION_CONTEXT_s1',
    //     //     //   value:
    //     //     //     '%7B%22ID%22%3A11%2C%22EXPIRE%22%3A1710788340%2C%22UNIQUE%22%3A%5B%22conversion_visit_day%22%5D%7D',
    //     //     // },
    //     //     // {
    //     //     //   name: ' tmr_lvid',
    //     //     //   value: '48ca903e9e5d3b11804659bfe91fbd7d',
    //     //     // },
    //     //     // {
    //     //     //   name: ' tmr_lvidTS',
    //     //     //   value: '1710592213576',
    //     //     // },
    //     //     // {
    //     //     //   name: ' carrotquest_session',
    //     //     //   value: 'qeie8i7d1ztcbl36ppm5aonu3shf2ofp',
    //     //     // },
    //     //     // // {
    //     //     // //   name: ' _ga_NZSSSGEP8F',
    //     //     // //   value: 'GS1.1.1710764494.1.0.1710764494.0.0.0',
    //     //     // // },
    //     //     // // {
    //     //     // //   name: ' _ga',
    //     //     // //   value: 'GA1.1.1859496732.1710764493',
    //     //     // // },
    //     //     // // {
    //     //     // //   name: ' _ga_DWDWSX8ZRZ',
    //     //     // //   value: 'GS1.2.1710764495.1.0.1710764495.0.0.0',
    //     //     // // },
    //     //     // // {
    //     //     // //   name: ' _ga_H9Z62YGYCM',
    //     //     // //   value: 'GS1.2.1710764495.1.0.1710764495.60.0.0',
    //     //     // // },
    //     //     // {
    //     //     //   name: ' carrotquest_session_started',
    //     //     //   value: '1',
    //     //     // },
    //     //     // {
    //     //     //   name: ' carrotquest_device_guid',
    //     //     //   value: 'a0d5fc42-3b8c-44ec-be0a-d69317279b9b',
    //     //     // },
    //     //     // {
    //     //     //   name: ' carrotquest_uid',
    //     //     //   value: '1666451466061089704',
    //     //     // },
    //     //     // {
    //     //     //   name: ' carrotquest_auth_token',
    //     //     //   value:
    //     //     //     'user.1666451466061089704.23139-c082d1441dfd0f22105416f38a.3cfb839146e64289ea12c410851cacda90d51ff06f26ab26',
    //     //     // },
    //     //     // // {
    //     //     // //   name: ' _ym_uid',
    //     //     // //   value: '1710592214989521779',
    //     //     // // },
    //     //     // // {
    //     //     // //   name: ' _ym_d',
    //     //     // //   value: '1710764496',
    //     //     // // },
    //     //     // // {
    //     //     // //   name: ' _ym_isad',
    //     //     // //   value: '2',
    //     //     // // },
    //     //     // // {
    //     //     // //   name: ' _ym_visorc',
    //     //     // //   value: 'b',
    //     //     // // },
    //     //     // {
    //     //     //   name: ' carrotquest_realtime_services_transport',
    //     //     //   value: 'wss',
    //     //     // },
    //     //     // {
    //     //     //   name: ' carrotquest_jwt_access',
    //     //     //   value:
    //     //     //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdHQiOiJhY2Nlc3MiLCJleHAiOjE3MTA3NjgwOTYsImlhdCI6MTcxMDc2NDQ5NiwianRpIjoiZjA5YmJhNTVmZjVhNDNmMGJmZGUwZGY2ZDA2NTE2YWIiLCJhY3QiOiJ3ZWJfdXNlciIsImN0cyI6MTcxMDc2NDQ5Niwicm9sZXMiOlsidXNlci4kYXBwX2lkOjIzMTM5LiR1c2VyX2lkOjE2NjY0NTE0NjYwNjEwODk3MDQiXSwiYXBwX2lkIjoyMzEzOSwidXNlcl9pZCI6MTY2NjQ1MTQ2NjA2MTA4OTcwNH0.-zBOzprm7ca6tGOo-bX1UZpc0jnDDvXq9p99hX624bk',
    //     //     // },
    //     //     // {
    //     //     //   name: ' tmr_detect',
    //     //     //   value: '0%7C1710764496546',
    //     //     // },
    //     //   ].map((el) => ({
    //     //     ...el,
    //     //     domain: '.planetazdorovo.ru',
    //     //   })),
    //     // );
    //     await page.setExtraHTTPHeaders({
    //       'user-agent':
    //         'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    //       'upgrade-insecure-requests': '1',
    //       accept:
    //         'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    //       'accept-encoding': 'gzip, deflate, br',
    //       'accept-language': 'en-US,en;q=0.9,en;q=0.8',
    //     });
    //     await page.goto('https://planetazdorovo.ru/tyumen/', {
    //       waitUntil: 'networkidle0',
    //     });
    //     const isJsEnabled = await page.isJavaScriptEnabled();
    //     console.log(isJsEnabled);
    //     const variables = await page.content();
    //     await page.waitForSelector('#root', { timeout: 100000 });
    //     await page.waitForNetworkIdle({ timeout: 100000 });
    //     await page.screenshot({ path: `${product}.png`, fullPage: true });
    //     await browser.close();
    //     return variables;
    //   });
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint:
          'ws://127.0.0.1:9222/devtools/browser/e85626df-29aa-48dd-85c9-d7fa4663b96e',
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
