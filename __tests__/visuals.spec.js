import '@babel/polyfill';
const puppeteer = require('puppeteer');

describe('pages', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('displays 404 page correctly', async () => {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 3000,
      deviceScaleFactor: 1,
    });
    await page.goto('http://localhost:3000/en/nothere', { waitUntil: 'networkidle2' });
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it('displays front page correctly', async () => {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 4000,
      deviceScaleFactor: 1,
    });
    await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle2' });
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
