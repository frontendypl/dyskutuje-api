const puppeteer = require("puppeteer");

const PrintScreen = require('../models/PrintScreen')

const topicProtocol = value => {

    let topic = value
    topic = topic.indexOf('http') === -1 ? `https://${topic}` : topic
    topic = topic.indexOf('http://') === 0 ? `https://${topic.split('http://')[1]}` : topic
    topic = topic.replace('www.', '')
    topic = topic.replace('www.', '')
    if(topic.indexOf('youtube') === -1 && topic.indexOf('google') === -1){
        topic = topic.split('?')[0]
    }else{

    }
    return topic
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
            // await page.goto(url);

            //Spróbować cookie's zamiast clicku

            try {
                if (url.indexOf('allegrolokalnie.pl') != -1) {
                    await page.goto(url);
                    await page.click('#cookies_confirm')
                }
                else if (url.indexOf('interia.pl') != -1) {

                    const interia_cookies = [{
                        'name': '_ga_JLHM569M6P',
                        'value': 'd',
                        'domain': '.interia.pl'
                    }, {
                        'name': 'inplrd',
                        'value': '{"v":"1","d":1687079916043,"tcf":"CPtjtoAPtjtoADnACAENDICsAP_AAH_AAB5YJftX_H__bW9r8f7_aft0eY1P9_j77uQzDhfNk-4F3L_W_JwX52E7NF36tqoKmR4Eu3LBIUNlHNHUTVmwaokVryHsak2cpTNKJ6BEkHMRO2dYCF5umxtjeQKY5_p_d3fx2D-t_dv-39z3z81Xn3dZf-_0-PCdU5_9Dfn9fRfb-9IP9_78v8v8_9_rk2_eX33_79_7_H9-f_876CXYBJhq3EAXZlDgTaBhFCiBGFYQEUCgAgoBhaICABwcFOyMAn1hEgBQCgCMCIEOAKMiAQAACQBIRABIEWCAAAAQCAAEACARCABgYBBQAWAgEAAIDoGKIUAAgSECREREKYEBUCQQEtlQglBdIaYQBVlgBQCI2CgARBICKwABAWDgGCJASsWCBJiDaIABgBQCiVCtRSemgIWMzYAA.YAAAAAAAAAAA"}',
                        'domain': '.interia.pl'
                    }, {
                        'name': '__jtuid',
                        'value': 'jgAAAAIAQMbYc1-y2lPT2hhSWDGXYejcmZmS0bb5Vf2jRy-VUGdIOnhTHDKsBLpI-N9SSbioixYPKPdNwI3X5nM9dN0RoQQ',
                        'domain': '.interia.pl'
                    },
                    {
                        'name': '__jtut',
                        'value': '1677052845913',
                        'domain': '.interia.pl'
                    },
                    {
                        'name': 'cto_bundle',
                        'value': '7ouJMF9xNHFhRVpMc0tOZ2k5bXNIVG9hWkJ3ZCUyRm5uYmZLMHk4UyUyRnJPVTJEbnRFWEFuZGRxUzVaMzBtY09qTzhxa3h1NFdhakNPdFpYbjdBZWFmTGROQk5aSzdTJTJGOFlFU3pFWVB3JTJCJTJGS3ZVbDNGZmZQeTMzYm5GeDh2d3BORzcyYXdyNWNtcElOTDFSU1Y5M3lua3Vhb2NVUVp3JTNEJTNE',
                        'domain': '.interia.pl'
                    },
                    {
                        'name': '__gfp_64b',
                        'value': 'QSQmQI1H1oiFjDUOY_cpm_0JZkPRb__e5d733bleeGL.y7|1647474619',
                        'domain': '.interia.pl'
                    },
                    {
                        'name': '_ga',
                        'value': 'GA1.1.2021989619.1647474620',
                        'domain': '.interia.pl'
                    },
                    {
                        'name': '_ga_ZYZ5Y5XPZ2',
                        'value': 'GS1.1.1677060901.2.0.1677060901.0.0.0',
                        'domain': '.interia.pl'
                    },
                    {
                        'name': '_ga_JLHM569M6P',
                        'value': 'GS1.1.1677060901.2.0.1677060901.0.0.0',
                        'domain': '.interia.pl'
                    }
                    ];

                    await page.setCookie(...interia_cookies);
                    await page.goto(url);
                }
                else if (url.indexOf('wp.pl') != -1) {
                    const wp_cookies = [{
                        'name': 'WPtcs2',
                        'value': 'CPt0MUAPt0MUABIACCPLDKCgAP_AAH_AAB5YJhNX_H__bW9r8f7-aft0eY1P9_j77uQxBhfJk-4F3LvW-JwX52E7NF36tqoKmR4Eu3LBIUNlHNHUTVmwaokVryHsak2cpTNKJ6BEkHMRO2dYCF5vmxtjeQKY5_p_d3fx2D-t_dv-39z3z81Xn3dZf-_0-PCdU5-9Dfn9fRfb-9IP9_78v8v8_9_rk2_eT13_79_7_H9-f_87_QTBAJMNS4gC7EocCZQMIoUQIwrCAigUAABAMDRAQAODAp0RgE-sIkAKEUARgRAhwBRkQCAAACAJCIAJAiwQAAACAQAAgAQCIQAEDAIKACwEAgABAdAxRCgAECQgSIiIhTAgIgSCAlsqEEoLpDTCAKssAKARGwUACIAARWAAICwcAwRICViwQJcQbRAAMACAUSoVqCT00ACgkbLAAAAA.YAAAAAAAAAAA',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'PWA_adbd',
                        'value': '0',
                        'domain': 'www.wp.pl'
                    },
                    {
                        'name': 'sgv',
                        'value': '1687525591',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'STvisit',
                        'value': '25d7a51c8e92fba8e068c780b5dee5af:3be005:1687525588:1687525588:6::::1:1:v2',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'BDhs',
                        'value': 'qlYyMjAyNjBTsqpWMjKzULIyrNWBChkZIwnWAgAAAP//AQAA//8=',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'c',
                        'value': '2',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'c',
                        'value': '2',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': '__gfp_64b',
                        'value': 'ojbBDj3D83oOZnaDuGzDaP2EhAqQsI8zfYeEY39vgkr.v7|1687525588',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'BDh',
                        'value': 'qlYyMjAyNjBTsqpWMk1JTDUxslSyMqytBQAAAP//AQAA//8=',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'STabid',
                        'value': '38e1974fe15cd5a7ec891b21b9760806:1687525587.464:v1',
                        'domain': 'www.wp.pl'
                    },
                    {
                        'name': 'statid',
                        'value': '977aaa212ce269752a87b19bde4af978:f7c1fa:1687525588:v3',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'STpage',
                        'value': 'sg:https%3A%2F%2Fwww.wp.pl%2F:1687525588:e3327edb6726678faa5d:v1',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'WPabs',
                        'value': 'f096eb',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'ttlStatid',
                        'value': 'f092703c-64fb-4f63-8d93-2f2c128b42c2',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'WPdp',
                        'value': 'u2jDhAtImJIT0lIFllITwBGV1EZBVsOVwhILgNGRx5ZWQZGQB5cWQVGTR5TWQNaKBBGV18YVwhYWRAHARBQRh5IAUFITwNcTQJZRQVYRQJaRQIXWRA+JRBQDhAJHhBQRx5IFkEaHFZITxAxRG9IWRAHBxBQRx5IGEZITwFGV0YZVwhbQwpaRgJdRwJaRQJaCB5IImInVwgRV1EBVwhYWRAJBkIDERBQV2lbWQBGRh5eWQdGQx5dWQpGTB5bRW9IWRAHBxBQRx5IGEZITwFGV0YZVwhbQwpaRgJdRwJaRQJaWRAfFBBQRE8X',
                        'domain': '.wp.pl'
                    },
                    {
                        'name': 'sgVisitId',
                        'value': '7b822e4e-793c-4f5b-b63c-aed11a270f09',
                        'domain': '.wp.pl'
                    },
                    ];

                    await page.setCookie(...wp_cookies);

                    await page.goto(url);
                }
                else if (url.indexOf('onet.pl') != -1) {
                    await page.goto(url);
                    await page.click('[aria-label="accept and close"]')
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

                const NewPrintScreen = new PrintScreen({
                    topic: topicId,
                    src: image,
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