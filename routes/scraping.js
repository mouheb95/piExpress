var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const Apify = require('apify');

const loggedCheck = async (page) => {
    try {
        await page.waitForSelector('#bluebarRoot', { timeout: 10000 });
        return true;
    } catch(err) {
        return false;
    }
};

Apify.main(async () => {
    const input = await Apify.getValue('INPUT');

    const fcbCacheStore = await Apify.openKeyValueStore('fcb-cache');
    const cookiesStoreKey = "mouheb.bzri@gmail.com".replace('@', '(at)');

    const browser = await Apify.launchPuppeteer();
    const page = await browser.newPage();

    let isLogged = false;
    let userCookies = await fcbCacheStore.getValue(cookiesStoreKey);
    if (userCookies) {
        console.log('Try to use cookies from cache..')
        await page.setCookie(...userCookies);
        await page.goto('https://facebook.com');
        isLogged = await loggedCheck(page);
    }

    if (!isLogged) {
        console.log(`Cookies from cache didn't work, try to login..`);
        await page.goto('https://facebook.com');
        await page.type('#email', "mouheb.bzri@gmail.com");
        await page.type('#pass', "AZErty14263");
        await page.click('#loginbutton input');
        await page.waitForNavigation();
        isLogged = await loggedCheck(page);
    }

    if (!isLogged) {
        throw new Error('Incorrect username or password!')
    }

/*     // Get cookies and refresh them in store cache
    console.log(`Saving new cookies to cache..`);
    const cookies = await page.cookies();
    await fcbCacheStore.setValue(cookiesStoreKey, cookies);

    // Use cookies in other tab or browser
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies); */
    await page.goto('https://www.facebook.com/groups/hlalitech/'); // Opens page as logged user
const posts = []
    const elementHandles = await page.$$('._1dwg');
    for(let elementHandle of elementHandles){
        const propertyHandle = await elementHandle.getProperty('innerText');
        const propertyValue = await propertyHandle.jsonValue();
        console.log(propertyValue);
        posts.push(propertyValue);
    }
    
    res.json(posts).end()
    
    await browser.close();

    console.log('Done.');
}); 

  });

module.exports = router;