const fetch = require('node-fetch')
const { csvParse } = require('d3-dsv')
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
    maxConcurrency: 4 // should probably match the no. of cores on your machine
  })

  await cluster.task(async ({ page, data: { lan, code, as } }) => {
    const timePagePDF = process.hrtime()

    await page.emulateMediaType('print');
    await page.goto(`http://localhost:3000/${lan}/country/${code}?as=${as}`, {
      waitUntil: 'networkidle2',
    });
    
    await page.pdf({
      path: `pdfs/${lan}-${code}.pdf`,
      format: 'A4',
      printBackground: true,
    });

    console.log(`${lan}-${code} done, timePagePDF: ${process.hrtime(timePagePDF)[0]}.${process.hrtime(timePagePDF)[1]} seconds`)
  })

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    for (let j = 0; j < languages.length; j++) {
      const lan = languages[j];
      const as = country.income === '1' ? 'hi' : 'core'
      cluster.queue({ lan, code: country.code, as })
    }
  }

  await cluster.idle()
  await cluster.close()
}

(async () => {
  const timePrintPDF = process.hrtime()
  const dataResponse = await fetch('http://data-store.humanrightsmeasurement.org/data/countries.csv')
  const countriesCsv = await dataResponse.text()
  const countriesData = csvParse(countriesCsv)

  // N.B. 4 more country codes in the lang file than in data, investigate
  const countries = countriesData.map(c => ({ code: c.country_code, income: c.high_income_country }))

  await printPDF({
    // countries: keys(getCountries(langJSON)),
    // countries: [{ code: 'NZL', income: '1' }],
    countries,
    languages: ['en', 'es', 'fr', 'pt']
  });
  console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]} seconds`)
})()
