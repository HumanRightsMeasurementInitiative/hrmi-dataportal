const puppeteer = require('puppeteer');

async function printPDF(
  route = 'http://localhost:3000/en/country/FJI?as=core',
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // need to emulate print media explicitly for background images
  // see https://github.com/puppeteer/puppeteer/issues/436#issuecomment-564008025
  await page.emulateMediaType('print');
  await page.goto(route, {
    waitUntil: 'networkidle2',
  });
  // await page.waitFor(1000);
  const pdf = await page.pdf({
    path: 'test-puppeteer.pdf',
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return pdf;
}

module.exports = printPDF;

// printPDF();
