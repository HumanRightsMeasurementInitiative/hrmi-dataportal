const path = require('path')
const fetch = require('node-fetch')
const { csvParse } = require('d3-dsv')
const { Cluster } = require('puppeteer-cluster')
const mkdirp = require('mkdirp')
// const keys = require('lodash/keys')

// const { getCountries } = require('./helpers/generate-files')

const { getCountryWithArticle } = require('../../app/utils/narrative')

const enJSON = require('../../app/translations/en.json')
const esJSON = require('../../app/translations/es.json')
const ptJSON = require('../../app/translations/pt.json')
const frJSON = require('../../app/translations/fr.json')
const zhJSON = require('../../app/translations/zh.json')
// pdf-specific languages
// NOTE that creating each of these one-off PDF's may require changes at build-time in i18n.js and narrative.js to get the right translation file for the target country
// this is to be revisited with the refactor work
// const viJSON = require('../../app/translations/vi.json')
// const koJSON = require('../../app/translations/ko.json')
// const ruKAZJSON = require('../../app/translations/ru-KAZ.json')
// const ruKGZJSON = require('../../app/translations/ru-KGZ.json')
// const arJORJSON = require('../../app/translations/ar-JOR.json')
// const arSAUJSON = require('../../app/translations/ar-SAU.json')
// const hiJSON = require('../../app/translations/hi.json')
// const zhTCCHNJSON = require('../../app/translations/zhTC-CHN.json')
// const zhTCHKGJSON = require('../../app/translations/zhTC-HKG.json')
// const zhTCTWNJSON = require('../../app/translations/zhTC-TWN.json')

// TODO: vscode hangs when the logo is in this file, so have moved it out for now while developing
const logo = require('./pdf-logo')

const currentYear = '2022'

const pdfsDir = path.join(process.cwd(), './pdfs')


async function printPDF({
  countries,
  languages
}) {
  // console.log({ languages, countries })

  const cluster = await Cluster.launch({
    puppeteerOptions: process.env.GITHUB_ACTIONS ? {} : {
      executablePath: 'google-chrome'
    },
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4 // should probably match the no. of cores on your machine
  })

  await cluster.task(async ({ page, data: { lang, code, grammar, langFile, as } }) => {
    const timePagePDF = process.hrtime()

    await page.emulateMediaType('print');
    await page.goto(`http://localhost:3000/${lang}/country/${code}?as=${as}`, {
      waitUntil: 'networkidle2',
    });

    const countryWithArticle = getCountryWithArticle(lang, grammar, langFile[`hrmi.countries.${code}`])
    console.log(`Country code: ${code} - ${countryWithArticle}`);

    const headerFooterStyle = `<style>@font-face{font-family:'Source Sans Pro';src:url(../../fonts/SourceSansPro-Regular.ttf) format("truetype");} #header { padding: 0 !important; } #footer { padding: 0 !important; } p, span { font-family: 'Source Sans Pro', sans-serif; font-size: 10px; color: #262064;}</style>`

    const subtitle = lang === 'zh' || lang === 'hi'
    ? `${langFile[`hrmi.pdf.countryProfiles`]} | ${countryWithArticle} ${langFile['hrmi.pdf.humanRightsIn']}, ${currentYear}`
    : `${langFile[`hrmi.pdf.countryProfiles`]} | ${langFile['hrmi.pdf.humanRightsIn']} ${countryWithArticle}, ${currentYear}`
    
    try {
      await page.pdf({
        path: `${pdfsDir}/${lang}-${code}.pdf`,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `${headerFooterStyle} <div style="font-family: 'Source Sans Pro', sans-serif; width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-left: 35px; margin-right: 35px; margin-top: 12px; margin-bottom: 0;"> <img src=${logo} alt="logo" style="width: 140px"></img> <p style="font-weight: 600">${subtitle}</p> </div>`,
        footerTemplate: `${headerFooterStyle} <div style="font-family: 'Source Sans Pro', sans-serif; height: 40px; width: 100%; background-color: #d3d3d3; -webkit-print-color-adjust: exact; display: flex; flex-direction: row; justify-content: space-around; align-items: center;"> <p style="font-weight: 600;">  HRMI ${currentYear} </p> <a href="http://rightstracker.org" style="text-decoration: none; color: unset"> <p>rightstracker.org </p> </a> <p style="font-weight: 600;"> Page <span class="pageNumber"></span>/<span class="totalPages"></span> </p></div>`,
        margin: {
          top: "65px",
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
    zh: zhJSON,
    // zh: zhTCHKGJSON,
    // zh: zhTCTWNJSON,
    // vi: viJSON,
    // ko: koJSON,
    // ru: ruKAZJSON, 
    // ru: ruKGZJSON, 
    // ar: arJORJSON, 
    // ar: arSAUJSON,
    // hi: hiJSON,
  }
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];

    for (let j = 0; j < languages.length; j++) {
      const lang = languages[j];
      const as = country.income === '1' ? 'hi' : 'core'
      cluster.queue({
        lang,
        code: country.code,
        grammar: country.grammar,
        langFile: langFileMap[lang],
        as
      })
    }
    // if (country.code === 'VNM') {
    //   const as = country.income === '1' ? 'hi' : 'core'
    //   cluster.queue({
    //     lang: 'vi',
    //     code: country.code,
    //     langFile: langFileMap['vi'],
    //     as
    //   })
    // }
    // if (country.code === 'KOR') {
    //   const as = country.income === '1' ? 'hi' : 'core'
    //   cluster.queue({
    //     lang: 'ko',
    //     code: country.code,
    //     langFile: langFileMap['ko'],
    //     as
    //   })
    // }
    // if (country.code === 'KAZ') {
    //   const as = country.income === '1' ? 'hi' : 'core'
    //   cluster.queue({
    //     lang: 'ru',
    //     code: country.code,
    //     langFile: langFileMap['ru'],
    //     as
    //   })
    // }
    // if (country.code === 'SAU') {
    //   const as = country.income === '1' ? 'hi' : 'core'
    //   cluster.queue({
    //     lang: 'ar',
    //     code: country.code,
    //     langFile: langFileMap['ar'],
    //     as
    //   })
    // }
    // if (country.code === 'IND') {
    //   const as = country.income === '1' ? 'hi' : 'core'
    //   cluster.queue({
    //     lang: 'hi',
    //     code: country.code,
    //     langFile: langFileMap['hi'],
    //     as
    //   })
    // }
    // if (country.code === 'TWN') {
    //   const as = country.income === '1' ? 'hi' : 'core'
    //   // cluster.queue({
    //   //   lang: 'en',
    //   //   code: country.code,
    //   //   langFile: langFileMap['en'],
    //   //   as
    //   // })
    //   cluster.queue({
    //     lang: 'zh',
    //     code: country.code,
    //     langFile: langFileMap['zh'],
    //     as
    //   })
    // }
  }

  await cluster.idle()
  await cluster.close()
}

(async () => {
  const timePrintPDF = process.hrtime()
  const dataResponse = await fetch('http://data-store.humanrightsmeasurement.org/data/countries_v3-1.csv')
  const countriesCsv = await dataResponse.text()
  const countriesData = csvParse(countriesCsv)
  const grammarResponse = await fetch('http://data-store.humanrightsmeasurement.org/data/countries_grammar_v3.csv')
  const grammarCsv = await grammarResponse.text()
  const grammarData = csvParse(grammarCsv)

  const countries = countriesData.map(c => {
    // N.B. can't just access with country_code due to weird csv column key parsing
    const countryCodeAccess = Object.keys(c)[0]
    return {
      code: c[countryCodeAccess],
      income: c.high_income_country,
      grammar: grammarData.find(g => g[countryCodeAccess] === c[countryCodeAccess])
    }
  })

  // TODO: any error handling needed on this?
  await mkdirp(pdfsDir)

  await printPDF({
    // countries: keys(getCountries(langJSON)),
    // countries: [{ code: 'AFG', income: '0' }],
    // countries: [{ code: 'AUS', income: '1', grammar: grammarData.find(g => g[Object.keys(g)[0]] === 'AUS') }],
    // countries: [{ code: 'USA', income: '1', grammar: grammarData.find(g => g[Object.keys(g)[0]] === 'USA') }],
    // countries: [{ code: 'COD', income: '0' }],
    // countries: [{ code: 'SAU', income: '1' }],
    // countries: [{ code: 'VNM', income: '0' }],
    // countries: [{ code: 'KAZ', income: '0' }],
    countries,
    languages: ['en', 'es', 'fr', 'pt', 'zh']
    // languages: ['en']
  });

  console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]} seconds`)
  process.exit(0)
})()

