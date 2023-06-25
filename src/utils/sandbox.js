// https://www.tabnine.com/code/javascript/functions/puppeteer/Page/%2524
// https://github.com/puppeteer/puppeteer/issues/1175

const puppeteer = require("puppeteer");

puppeteer
  .launch({
    headless: 'new',
    // args: ['--shm-size=3gb'],
    defaultViewport: {
      width: 1280,
      height: 1000,
    },
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://allegrolokalnie.pl/oferta/lenovo-legion-5pro-i3e");
    // const value = await page.evaluate(() => {
    //   const title = document.querySelector('title').textContent
      
    //   return title
    // });
    // await page.waitForNavigation()


      await page.click('#cookies_confirm')
    // const image = await page.screenshot({ encoding: 'base64' });
    await page.screenshot({ path: "nyt-puppeteer.png" });

    // const image = await page.screenshot({ encoding: 'base64' });
    // console.log(image)
    // console.log(await page.title())

    // await page.close();
    await browser.close();
  });

