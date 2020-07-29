const url = require('url');
import * as functions from 'firebase-functions';
import * as puppeteer  from 'puppeteer'

interface printPDFOptions {
  route?: string;
  path?: string;
}

export async function printPDF({
  route = 'http://localhost:3000/en/country/FJI?as=core',
  path
}: printPDFOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // need to emulate print media explicitly for background images
  // see https://github.com/puppeteer/puppeteer/issues/436#issuecomment-564008025
  await page.emulateMediaType('print');
  await page.goto(route, {
    waitUntil: 'networkidle2',
  });
  const pdf = await page.pdf({
    path,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return pdf;
}

export const generatePDF = functions.https.onRequest((request, response) => {
  functions.logger.info("generatePDF called", { structuredData: true });
  const host = request.get('host')
  let fullRoute

  // if local dev, fullRoute is just the default path above
  if (host && !host.includes('localhost')) {
    fullRoute = `${request.protocol}://${host}${
      url.parse(request.url).pathname
    }`;
  }

  printPDF({ route: fullRoute })
  .then(pdf => {
    response.setHeader('Content-Type', 'application/pdf')
    response.status(200).send(pdf)
  })
  .catch(error => {
    response.status(500).send({ error });
  });
});
