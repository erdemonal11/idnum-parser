const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://tcnobul.com/tc-numarasi-uret');

    await page.click('#tcButton');

    await page.waitForSelector('#tcDiv.headLightText');

    const tcNumber = await page.evaluate(() => {
        const element = document.querySelector('#tcDiv.headLightText');
        return element ? element.innerText : null;
    });
    console.log(`TC Number: ${tcNumber}`);
    await browser.close();
})();