import * as functions from 'firebase-functions';
import * as puppeteer  from 'puppeteer'
import * as express from 'express'
import * as cors from 'cors'

interface printPDFOptions {
  route?: string;
  path?: string;
}

const pdf = express()
pdf.use(cors({ origin: true }))

export async function printPDF({
  route = 'http://localhost:3000/en/country/FJI?as=core',
  path
}: printPDFOptions) {
  console.time('puppeteer')
  console.time('puppeteer launch and newPage')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // need to emulate print media explicitly for background images
  // see https://github.com/puppeteer/puppeteer/issues/436#issuecomment-564008025
  await page.emulateMediaType('print');
  console.timeEnd('puppeteer launch and newPage')
  console.time('puppeteer goto')
  await page.goto(route, {
    waitUntil: 'networkidle2',
  });
  console.timeEnd('puppeteer goto')
  console.time('puppeteer page.pdf')
  const result = await page.pdf({
    path,
    format: 'A4',
    printBackground: true,
  });
  console.timeEnd('puppeteer page.pdf')
  console.timeEnd('puppeteer')

  await browser.close();

  return result;
}

pdf.post('/', (request, response) => {
  const { href } = JSON.parse(request.body)
  functions.logger.log(href)

  printPDF({ route: href })
  .then(result => {
    response.setHeader('Content-Type', 'application/pdf')
    response.status(200).send(result)
  })
  .catch(error => {
    response.status(500).send({ error });
  });
})

exports.pdf = functions.runWith({ memory: '512MB' }).https.onRequest(pdf);
