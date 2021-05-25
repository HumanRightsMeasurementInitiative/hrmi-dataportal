const path = require('path')
const fetch = require('node-fetch')
const { csvParse } = require('d3-dsv')
const { Cluster } = require('puppeteer-cluster')
const mkdirp = require('mkdirp')
// const keys = require('lodash/keys')

// const { getCountries } = require('./helpers/generate-files')

const enJSON = require('../../app/translations/en.json')
const esJSON = require('../../app/translations/es.json')
const ptJSON = require('../../app/translations/pt.json')
const frJSON = require('../../app/translations/fr.json')
const zhJSON = require('../../app/translations/zh.json')

// TODO: vscode hangs when the logo is in this file, so have moved it out for now while developing
const logo = require('./pdf-logo')

const currentYear = '2020'

const pdfsDir = path.join(process.cwd(), './pdfs')

async function printPDF({
  countries,
  languages
}) {
  // console.log({ languages, countries })

  const cluster = await Cluster.launch({
    puppeteerOptions: process.env.GITHUB_ACTIONS ? {} : {
      executablePath: '/opt/homebrew/bin/chromium'
    },
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4 // should probably match the no. of cores on your machine
  })

  await cluster.task(async ({ page, data: { lang, code, langFile, as } }) => {
    const timePagePDF = process.hrtime()

    await page.emulateMediaType('print');
    await page.goto(`http://localhost:3000/${lang}/country/${code}?as=${as}`, {
      waitUntil: 'networkidle2',
    });

    const headerFooterStyle = `<style>@font-face{font-family:'Source Sans Pro';src:url(../../fonts/SourceSansPro-Regular.ttf) format("truetype");} #header { padding: 0 !important; } #footer { padding: 0 !important; } p, span { font-family: 'Source Sans Pro', sans-serif; font-size: 10px; color: #262064;}</style>`

    const subtitle = lang === 'zh'
    ? `${langFile[`hrmi.pdf.countryProfiles`]} | ${langFile[`hrmi.countries.${code}`]} ${langFile['hrmi.pdf.humanRightsIn']}, ${currentYear}`
    : `${langFile[`hrmi.pdf.countryProfiles`]} | ${langFile['hrmi.pdf.humanRightsIn']} ${langFile[`hrmi.countries.${code}`]}, ${currentYear}`
    
    try {
      await page.pdf({
        path: `${pdfsDir}/${lang}-${code}.pdf`,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `${headerFooterStyle} <div style="font-family: 'Source Sans Pro', sans-serif; width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-left: 35px; margin-right: 35px; margin-top: 12px; margin-bottom: 0;"> <img src=${logo} alt="logo" style="width: 140px"></img> <p style="font-weight: 600">${subtitle}</p> </div>`,
        footerTemplate: `${headerFooterStyle} <div style="font-family: 'Source Sans Pro', sans-serif; height: 40px; width: 100%; background-color: #d3d3d3; -webkit-print-color-adjust: exact; display: flex; flex-direction: row; justify-content: space-around; align-items: center;"> <p style="font-weight: 600;">  HRMI 2020 </p> <a href="http://rightstracker.org" style="text-decoration: none; color: unset"> <p>rightstracker.org </p> </a> <p style="font-weight: 600;"> Page <span class="pageNumber"></span>/<span class="totalPages"></span> </p></div>`,
        margin: {
          top: "55px",
          bottom: "76px",
        }
      });
    } catch (err) {
      console.error(err)
    }

    console.log(`${lang}-${code} done, timePagePDF: ${process.hrtime(timePagePDF)[0]}.${process.hrtime(timePagePDF)[1]} seconds`)
  })

  const langFileMap = {
    en: enJSON,
    es: esJSON,
    fr: frJSON,
    pt: ptJSON,
    zh: zhJSON
  }
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    for (let j = 0; j < languages.length; j++) {
      const lang = languages[j];
      const as = country.income === '1' ? 'hi' : 'core'
      cluster.queue({
        lang,
        code: country.code,
        langFile: langFileMap[lang],
        as
      })
    }
  }

  await cluster.idle()
  await cluster.close()
}

(async () => {
  const timePrintPDF = process.hrtime()
  const dataResponse = await fetch('http://data-store.humanrightsmeasurement.org/data/countries_v3-1.csv')
  const countriesCsv = await dataResponse.text()
  const countriesData = csvParse(countriesCsv)

  const countries = countriesData.map(c => {
    // N.B. can't just access with country_code due to weird csv column key parsing
    const countryCodeAccess = Object.keys(c)[0]
    return { code: c[countryCodeAccess], income: c.high_income_country }
  })

  // TODO: any error handling needed on this?
  await mkdirp(pdfsDir)

  await printPDF({
    // countries: keys(getCountries(langJSON)),
    // countries: [{ code: 'NIU', income: '0' }],
    // countries: [{ code: 'AUS', income: '1' }],
    // countries: [{ code: 'COD', income: '0' }],
    countries,
    languages: ['en', 'es', 'fr', 'pt', 'zh']
    // languages: ['pt']
  });

  console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]} seconds`)
  process.exit(0)
})()

