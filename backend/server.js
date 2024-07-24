const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/scrape', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://tcnobul.com/');

    const spanContent = await page.evaluate(() => {
        const spanElement = document.querySelector('#tcDiv');
        return spanElement ? spanElement.textContent.trim() : 'Element bulunamadı';
    });

    await browser.close();
    res.json({ spanContent });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
