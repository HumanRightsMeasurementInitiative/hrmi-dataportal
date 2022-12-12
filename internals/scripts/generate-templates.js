const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const map = require('lodash/map')
const keys = require('lodash/keys')

const { getCountries, getIndicators, getRights } = require('./helpers/generate-files')

const firebaseJSON = require('../../firebase.json')
const langJSON = require('../../app/translations/en.json')

const countries = getCountries(langJSON)
const rights = getRights(langJSON)
const indicators = getIndicators(langJSON)
const coreRewrite = { "source": "**", "destination": "/index.html" }

const pages = { ...countries, ...rights, ...indicators }

firebaseJSON.hosting.rewrites = map(pages, (v, k) => {
  return {
    "source": `**/${k}*`,
    "destination": `/${k}.html`
  }
}).concat(coreRewrite)

fs.writeFileSync(path.join(__dirname, '../../firebase.json'), JSON.stringify(firebaseJSON))

// HTML
const html = fs.readFileSync(path.join(__dirname, '../../app/index.html'), 'utf8')
const $ = cheerio.load(html)

keys(pages).forEach(code => {
  // if not found, each of these will just be undefined
  const country = countries[code]
  const right = rights[code]
  const indicator = indicators[code]

  $("head meta[property='og:title']").attr('content', `${country || right || indicator} - Human Rights Tracker`)
  if (country) {
    $("head meta[property='og:image']").attr('content', `http://content-store.humanrightsmeasurement.org/assets/uploads/country_${code}.png`)
  } else if (indicator) {
    $("head meta[property='og:image']").attr('content', `http://content-store.humanrightsmeasurement.org/assets/uploads/indicator_${code}.png`)
  } else {
    $("head meta[property='og:image']").attr('content', `http://content-store.humanrightsmeasurement.org/assets/uploads/right_${code}.png`)
  }
  
  
  $("head title").text(`${country || right || indicator} - Human Rights Tracker`)
  fs.writeFileSync(path.join(__dirname, `../../app/templates/${code}.html`), $.html())
})


