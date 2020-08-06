import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as puppeteer  from 'puppeteer'
import * as express from 'express'
import * as cors from 'cors'

interface printPDFOptions {
  route?: string;
  path?: string;
  countryCode: string
}

const pdf = express()
pdf.use(cors({ origin: true }))

admin.initializeApp({
  storageBucket: 'hrmi-dataportal-staging.appspot.com'
})

export async function printPDF({
  route = 'http://localhost:3000/en/country/FJI?as=core',
  path,
  countryCode
}: printPDFOptions) {
  const timePuppeteer = process.hrtime()

  const timeStorage = process.hrtime()
  const pdfBucket = admin.storage().bucket()
  const pdfFile = pdfBucket.file(`${countryCode}.pdf`)

  let exists
  try {
    exists = await pdfFile.exists()
  } catch(err) {
    console.error(err)
    throw new Error("Error determining if file exists in storage")
  }

  if (exists[0]) {
    try {
      // download the file here, and send it to user as a response without needing to use puppeteer to snapshot the page
      // TODO: harden the GCS bucket to only accept reads from this function
      // OLD: just send the storage bucket file link to user
      // pdfFileResult = await pdfFile.get()
      // // @ts-ignore
      // return pdfFileResult[1].mediaLink

      const pdfDownload = await pdfFile.download()
      const pdfContents = pdfDownload[0]
      functions.logger.log(`timeStorage: ${process.hrtime(timeStorage)}`)
      functions.logger.log(`timePuppeteer: ${process.hrtime(timePuppeteer)}`)
      return pdfContents
    } catch(err) {
      console.error(err)
      throw new Error("Error getting file from storage")
    }
  }

  functions.logger.log(`timeStorage: ${process.hrtime(timeStorage)}`)

  const timeLaunchNewPage = process.hrtime()
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // need to emulate print media explicitly for background images
  // see https://github.com/puppeteer/puppeteer/issues/436#issuecomment-564008025
  await page.emulateMediaType('print');
  functions.logger.log(`timeLaunchNewPage: ${process.hrtime(timeLaunchNewPage)}`)

  const timeGoto = process.hrtime()
  await page.goto(route, {
    waitUntil: 'networkidle2',
  });
  functions.logger.log(`timeGoto: ${process.hrtime(timeGoto)}`)

  const timePagePDF = process.hrtime()
  const result = await page.pdf({
    path,
    format: 'A4',
    printBackground: true,
  });
  functions.logger.log(`timePagePDF: ${process.hrtime(timePagePDF)}`)

  functions.logger.log(`timePuppeteer: ${process.hrtime(timePuppeteer)}`)
  await browser.close();

  try {
    await pdfFile.save(result)
    await pdfFile.makePublic()
    // return the downloadable url?
    return result
  } catch(err) {
    console.error(err)
    throw new Error("Error saving file to storage")
  }
}

pdf.post('/', (request, response) => {
  const { href, countryCode } = JSON.parse(request.body)
  functions.logger.log(href)

  printPDF({ route: href, countryCode })
  .then(result => {
    response.setHeader('Content-Type', 'application/pdf')
    response.status(200).send(result)
  })
  .catch(error => {
    response.status(500).send({ error });
  });
})

exports.pdf = functions.runWith({ memory: '512MB' }).https.onRequest(pdf);
