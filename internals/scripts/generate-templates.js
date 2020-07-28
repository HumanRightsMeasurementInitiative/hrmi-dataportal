const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const pickBy = require('lodash/pickBy')
const flow = require('lodash/flow')
const mapKeys = require('lodash/mapKeys')
const map = require('lodash/map')
const clone = require('lodash/clone')
const keys = require('lodash/keys')

const firebaseJSON = require('../../firebase.json')
const langJSON = require('../../app/translations/en.json')

// rewrites
const getCountries = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.countries')
  }),
  (data) => mapKeys(data, (v, k) => {
    return k.split('.')[2]
  })
])

const countries = getCountries(langJSON)
const originalRewrites = clone(firebaseJSON.hosting.rewrites)

firebaseJSON.hosting.rewrites = map(countries, (v, k) => {
  return {
    "source": `**/${k}*`,
    "destination": `/${k}.html`
  }
}).concat(originalRewrites)

fs.writeFileSync(path.join(__dirname, '../../firebase.json'), JSON.stringify(firebaseJSON))

// HTML
const html = fs.readFileSync(path.join(__dirname, '../../app/index.html'), 'utf8')
const $ = cheerio.load(html)

keys(countries).forEach(code => {
  const country = countries[code]
  $("head meta[property='og:title']").attr('content', `${country} - HRMI Rights Tracker`)
  $("head meta[property='og:image']").attr('content', `http://content-store.humanrightsmeasurement.org/assets/uploads/country_${code}.png`)
  $("head title").text(`${country} - HRMI Rights Tracker`)
  fs.writeFileSync(path.join(__dirname, `../../app/templates/${code}.html`), $.html())
})


