const puppeteer = require('puppeteer');

async function printPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.emulateMediaType('print')
  await page.goto('http://localhost:3000/en/country/FJI?as=core', {
    waitUntil: 'networkidle2',
  });
  // await page.waitFor(1000);
  await page.pdf({
    path: 'test-puppeteer.pdf',
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
}

printPDF();
