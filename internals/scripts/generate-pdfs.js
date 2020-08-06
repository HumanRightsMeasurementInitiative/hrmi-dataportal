// const functions = require('firebase-functions');
const puppeteer = require('puppeteer')
const keys = require('lodash/keys')

const { getCountries } = require('./helpers/generate-files')

const langJSON = require('../../app/translations/en.json')

async function printPDF({
  countries,
}) {
  console.log({ countries })

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // need to emulate print media explicitly for background images
  // see https://github.com/puppeteer/puppeteer/issues/436#issuecomment-564008025
  await page.emulateMediaType('print');


  // handle multiple pages at once
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    const timeGoto = process.hrtime()
    await page.goto(`http://localhost:3000/en/country/${country}?as=core`, {
      waitUntil: 'networkidle2',
    });
    console.log(`timeGoto: ${process.hrtime(timeGoto)[0]}.${process.hrtime(timeGoto)[1]}`)

    const timePagePDF = process.hrtime()
    const result = await page.pdf({
      path: `pdfs/${country}.pdf`,
      format: 'A4',
      printBackground: true,
    });
    console.log(`${country} done, timePagePDF: ${process.hrtime(timePagePDF)[0]}.${process.hrtime(timePagePDF)[1]}`)
  }
  await browser.close();
}

const timePrintPDF = process.hrtime()
printPDF({
  countries: keys(getCountries(langJSON))
});
console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]}`)