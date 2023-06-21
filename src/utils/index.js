const puppeteer = require("puppeteer");

const PrintScreen = require('../models/PrintScreen')

const topicProtocol = value =>{

    let topic = value
    topic = topic.indexOf('http') === -1 ? `https://${topic}` : topic
    topic = topic.indexOf('http://') === 0 ? `https://${topic.split('http://')[1]}` : topic
    topic = topic.replace('www.','')
    topic = topic.replace('www.','')
    topic = topic.split('?')[0]

    return topic
}

const createPrintScreen = (topicId, url) =>{

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
      await page.goto(url);
      const image = await page.screenshot({ encoding: 'base64' });
      const title = await page.title()
      
      try{
        const NewPrintScreen = new PrintScreen({
            topic: topicId,
            src: image,
            title
          })
          await NewPrintScreen.save()
      }catch(e){
        console.log(e.errors)
      }

      await browser.close();
    
    });

}

module.exports = {
    topicProtocol,
    createPrintScreen
}