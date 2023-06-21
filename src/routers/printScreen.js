const puppeteer = require("puppeteer");

puppeteer
  .launch({
    headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 1000,
    },
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://allegrolokalnie.pl/oferta/lenovo-legion-5pro-i3e");
    const image = await page.screenshot({ encoding: 'base64' });
    console.log(image)
    console.log(await page.title())
    await browser.close();
  });

