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

  await cluster.task(async ({ page, data: { lan, country } }) => {
    const timePagePDF = process.hrtime()

    await page.emulateMediaType('print');
    await page.goto(`http://localhost:3000/${lan}/country/${country}?as=core`, {
      waitUntil: 'networkidle2',
    });

    const pStyle = "font-size: 10px; color: #262064; font-family: Source Sans Pro !important"

    await page.pdf({
      path: `pdfs/${lan}-${country}.pdf`,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `<h1 style="font-size: 50px">HEADER</h1>`,
      footerTemplate: `<style>
        @font-face {
          font-family: SourceSansPro;src:url(../../fonts/SourceSansPro-Regular.ttf) format("truetype");
        }
        @import url(//fonts.googleapis.com/css2?family=Source+Sans+Pro)
        p, span {
          font-family: SourceSansPro, 'Source Sans Pro' !important
        }
        #footer { padding: 0 !important; } 
      </style>
      <div style="height: 40px; width: 100%; background-color: #d3d3d3; -webkit-print-color-adjust: exact; display: flex; flex-direction: row; justify-content: space-around;">
        <p style="${pStyle}; font-weight: 600;">
          ©HRMI 2020
        </p>
        <a href="http://rightstracker.org" style="text-decoration: none; color: unset">
          <p style="${pStyle}">
            rightstracker.org
          </p>
        </a>
        <p style="${pStyle}; font-weight: 600;">
          Page 
            <span class="pageNumber" style="${pStyle}"></span>
            /
            <span class="totalPages" style="${pStyle}"></span>
        </p>
      </div>`,
      marginTop: 70,
      marginBottom: 70
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
    // countries: [keys(getCountries(langJSON))],
    countries: ['ALB'],
    // languages: ['en', 'es', 'fr', 'pt']
    languages: ['en']
  });
  console.log(`generate-pdfs done, timePrintPDF: ${process.hrtime(timePrintPDF)[0]}.${process.hrtime(timePrintPDF)[1]} seconds`)
})()
