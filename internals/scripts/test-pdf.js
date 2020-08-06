const { printPDF } = require('../../functions/src/index')
printPDF({
  path: 'test-country.pdf',
  countryCode: 'FJI',
  local: true
});
