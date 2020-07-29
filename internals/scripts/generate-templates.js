const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const pickBy = require('lodash/pickBy')
const flow = require('lodash/flow')
const mapKeys = require('lodash/mapKeys')
const map = require('lodash/map')
const keys = require('lodash/keys')

const firebaseJSON = require('../../firebase.json')
const langJSON = require('../../app/translations/en.json')

const getMessageName = (data) => mapKeys(data, (v, k) => {
  return k.split('.')[2]
})

// rewrites
const getCountries = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.countries')
  }),
  getMessageName
])

const getRights = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.rights.') && !k.includes('job') && !k.includes('union') // N.B. note the dot following hrmi.rights.
  }),
  getMessageName
])

const getIndicators = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.indicators.') // N.B. note the dot following hrmi.indicators.
  }),
  getMessageName
])

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

  $("head meta[property='og:title']").attr('content', `${country || right || indicator} - HRMI Rights Tracker`)
  if (country) {
    $("head meta[property='og:image']").attr('content', `http://content-store.humanrightsmeasurement.org/assets/uploads/country_${code}.png`)
  } else if (indicator) {
    $("head meta[property='og:image']").attr('content', `http://content-store.humanrightsmeasurement.org/assets/uploads/indicator_${code}.png`)
  } else {
    // TODO: can't use rights svg's as og:image, upload them somewhere as png's?
    // keep as default HRMI image for now
    $("head meta[property='og:image']").attr('content', `/hrmi-og.png`)
  }
  
  $("head title").text(`${country || right || indicator} - HRMI Rights Tracker`)
  fs.writeFileSync(path.join(__dirname, `../../app/templates/${code}.html`), $.html())
})


