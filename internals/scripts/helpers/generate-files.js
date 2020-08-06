const pickBy = require('lodash/pickBy')
const flow = require('lodash/flow')
const mapKeys = require('lodash/mapKeys')

export const getMessageName = (data) => mapKeys(data, (v, k) => {
  return k.split('.')[2]
})

export const getCountries = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.countries')
  }),
  getMessageName
])

export const getRights = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.rights.') && !k.includes('job') && !k.includes('union') // N.B. note the dot following hrmi.rights.
  }),
  getMessageName
])

export const getIndicators = flow([
  (data) => pickBy(data, (v, k) => {
    return k.includes('hrmi.indicators.') // N.B. note the dot following hrmi.indicators.
  }),
  getMessageName
])