const puppeteer = require("puppeteer");

const PrintScreen = require('../models/PrintScreen')

const cookiesArray = require('./cookiesArray')

const topicProtocol = value => {

    let topic = value
    topic = topic.indexOf('http') === -1 ? `https://${topic}` : topic
    topic = topic.indexOf('http://') === 0 ? `https://${topic.split('http://')[1]}` : topic
    topic = topic.replace('www.', '')
    topic = topic.replace('www.', '')
    if (topic.indexOf('youtube') === -1 && topic.indexOf('google') === -1) {
        topic = topic.split('?')[0]
    } else {

    }
    return topic
}

/**
 * 
 * @param {object} page 
 * @param {string} url 
 * @param {string} selector 
 */
// const clickElement = async (page, url, selector)=>{
//     await page.goto(url);
//     try {
//         await page.click(selector)
//     }catch(e) {
//         console.log(e)
//     }
// }
const clickElement = async (page, url, selector) => {
    await page.goto(url);
    await new Promise(r => setTimeout(r, url.indexOf('allegro.pl') != -1 ? 5000: 100));
    await page.click(selector)
    await new Promise(r => setTimeout(r, 100));
}

/**
 * 
 * @param {object} page 
 * @param {string} url 
 * @param {Array} cookies 
 */
const loadPageWithCookies = async (page, url, cookies) => {
    await page.setCookie(...cookies);
    await page.goto(url);
}

const createPrintScreen = (topicId, url) => {

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

            try {
                if (url.indexOf('allegrolokalnie.pl') != -1) {
                    await clickElement(page, url, '#cookies_confirm')
                }
                if (url.indexOf('allegro.pl') != -1) {
                    await clickElement(page, url, '[data-role="accept-consent"]')
                }
                if (url.indexOf('tvp.info') != -1) {
                    await clickElement(page, url, '.tvp-cookie-overlay .tvp-covl__ab')
                }
                if (url.indexOf('rmf24.pl') != -1) {
                    await clickElement(page, url, '#gr-btn-agree')
                }
                if (url.indexOf('defence24.pl') != -1) {
                    await clickElement(page, url, '#qc-cmp2-ui [mode="primary"]')
                }
                if (url.indexOf('polsatnews.pl') != -1) {
                    await clickElement(page, url, '#onetrust-accept-btn-handler')
                }
                if (url.indexOf('gazeta.pl') != -1) {
                    await clickElement(page, url, '#onetrust-accept-btn-handler')
                }
                else if (url.indexOf('interia.pl') != -1) {
                    await loadPageWithCookies(page, url, cookiesArray['interia'])
                }
                else if (url.indexOf('wp.pl') != -1) {
                    await loadPageWithCookies(page, url, cookiesArray['wp'])
                }
                // else if (url.indexOf('o2.pl') != -1) {
                //     await loadPageWithCookies(page,url,cookiesArray['o2'])
                // }
                else if (url.indexOf('onet.pl') != -1) {
                    await clickElement(page, url, '[aria-label="accept and close"]')
                }
                else if (url.indexOf('olx.pl') != -1) {
                    await clickElement(page, url, '#onetrust-accept-btn-handler')
                }
                else {
                    await page.goto(url);
                }

                const image = await page.screenshot({
                    encoding: 'base64',
                    type: 'webp',
                    // quality: 70
                });
                const title = await page.title()

                let adultContent = false
                const keyWords = ['porn', 'seks', 'sex', '18+']
                keyWords.forEach(val=>{
                    if(title.indexOf(val) !== -1){
                     adultContent = true   
                    }
                })

                const NewPrintScreen = new PrintScreen({
                    topic: topicId,
                    src: adultContent? '' : image,
                    title: title
                })
                await NewPrintScreen.save()

            } catch (e) {
                console.log(e.errors)
            }

            await browser.close();
        });

}

module.exports = {
    topicProtocol,
    createPrintScreen
}