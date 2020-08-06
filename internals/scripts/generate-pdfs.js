const { Cluster } = require('puppeteer-cluster')
const keys = require('lodash/keys')

const { getCountries } = require('./helpers/generate-files')

const langJSON = require('../../app/translations/en.json')

async function printPDF({
  countries,
  languages
}) {
  console.log({ languages, countries })

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4
  })

  await cluster.task(async ({ page, data: { lan, country } }) => {
    const timePagePDF = process.hrtime()

    await page.emulateMediaType('print');
    await page.goto(`http://localhost:3000/${lan}/country/${country}?as=core`, {
      waitUntil: 'networkidle2',
    });
    
    await page.pdf({
      path: `pdfs/${lan}-${country}.pdf`,
      format: 'A4',
      printBackground: true,
    });

    console.log(`${lan}-${country} done, timePagePDF: ${process.hrtime(timePagePDF)[0]}.${process.hrtime(timePagePDF)[1]} seconds`)
  })

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    for (let j = 0; j < languages.length; j++) {
      const lan = languages[j];
      cluster.queue({ lan, country })
    }
  }

  await cluster.idle()
  await cluster.close()
}

(async () => {
  const timePrintPDF = process.hrtime()
  await printPDF({
    countries: keys(getCountries(langJSON)),
    languages: ['en', 'es', 'fr', 'pt']
  });
  console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]} seconds`)
})()
