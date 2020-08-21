const { Cluster } = require('puppeteer-cluster')
const keys = require('lodash/keys')
// const { messages } = require('../../app/messages')

const { getCountries } = require('./helpers/generate-files')

const enJSON = require('../../app/translations/en.json')
const esJSON = require('../../app/translations/es.json')
const ptJSON = require('../../app/translations/pt.json')
const frJSON = require('../../app/translations/fr.json')

// TODO: vscode hangs when the logo is in this file, so have moved it out for now while developing
const logo = require('./pdf-logo')

const currentYear = new Date(Date.now()).getFullYear()

async function printPDF({
  countries,
  languages
}) {
  console.log({ languages, countries })

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4 // should probably match the no. of cores on your machine
  })

  await cluster.task(async ({ page, data: { lang, country, langFile } }) => {
    const timePagePDF = process.hrtime()

    await page.emulateMediaType('print');
    await page.goto(`http://localhost:3000/${lang}/country/${country}?as=core`, {
      waitUntil: 'networkidle2',
    });

    // <style> #header {padding: 0 !important} p, span { font-family: 'Source Sans Pro', sans-serif; font-size: 10px; color: #262064;}</style><div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between;margin-left: 35px; margin-right: 35px; margin-top: 5px; margin-bottom: 0;"> <img src=${logo} alt="logo" style="width: 120px"></img> <p style="font-weight: 600">${langFile['hrmi.pdf.subtitle']} ${langFile[`hrmi.countries.${country}`]}, ${currentYear}</p> </div>

    // <style> @font-face {font-family: SourceSansPro;src:url(../../fonts/SourceSansPro-Regular.ttf) format("truetype");} p, span {font-family: SourceSansPro !important; font-size: 10px; color: #262064;} #footer { padding: 0 !important; } </style><div style="height: 40px; width: 100%; background-color: #d3d3d3; -webkit-print-color-adjust: exact; display: flex; flex-direction: row; justify-content: space-around;"> <p style="font-weight: 600;">  ©HRMI 2020 </p> <a href="http://rightstracker.org" style="text-decoration: none; color: unset"> <p>rightstracker.org </p> </a> <p style="font-weight: 600;"> Page <span class="pageNumber"></span>/<span class="totalPages"></span> </p></div>

    const headerFooterStyle = `<style>@font-face{font-family:'Source Sans Pro';src:url(../../fonts/SourceSansPro-Regular.ttf) format("truetype");} #header { padding: 0 !important; } #footer { padding: 0 !important; } p, span { font-family: 'Source Sans Pro', sans-serif; font-size: 10px; color: #262064;}</style>`


    try {
      await page.pdf({
        path: `pdfs/${lang}-${country}.pdf`,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `${headerFooterStyle} <div style="font-family: 'Source Sans Pro', sans-serif; width: 100%; display: flex; flex-direction: row; justify-content: space-between;margin-left: 35px; margin-right: 35px; margin-top: 5px; margin-bottom: 0;"> <img src=${logo} alt="logo" style="width: 120px"></img> <p style="font-weight: 600">${langFile['hrmi.pdf.subtitle']} ${langFile[`hrmi.countries.${country}`]}, ${currentYear}</p> </div>`,
        footerTemplate: `${headerFooterStyle} <div style="font-family: 'Source Sans Pro', sans-serif; height: 40px; width: 100%; background-color: #d3d3d3; -webkit-print-color-adjust: exact; display: flex; flex-direction: row; justify-content: space-around;"> <p style="font-weight: 600;">  ©HRMI 2020 </p> <a href="http://rightstracker.org" style="text-decoration: none; color: unset"> <p>rightstracker.org </p> </a> <p style="font-weight: 600;"> Page <span class="pageNumber"></span>/<span class="totalPages"></span> </p></div>`,
        margin: {
          top: "55px",
          bottom: "76px",
        }
      })
    } catch (e) {
      console.log('Pdf error', e);
    }

    console.log(`${lang}-${country} done, timePagePDF: ${process.hrtime(timePagePDF)[0]}.${process.hrtime(timePagePDF)[1]} seconds`)
  })

  const langFileMap = {
    en: enJSON,
    es: esJSON,
    fr: frJSON,
    pt: ptJSON
  }
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    for (let j = 0; j < languages.length; j++) {
      const lang = languages[j];
      cluster.queue({ lang, country, langFile: langFileMap[lang] })
    }
  }

  await cluster.idle()
  await cluster.close()
}

(async () => {
  const timePrintPDF = process.hrtime()
  await printPDF({
    // countries: keys(getCountries(enJSON)),
    countries: ['CAN'],
    // languages: ['en', 'fr', 'es', 'pt']
    languages: ['fr', 'es', 'pt']
  });

  console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]} seconds`)
})()

