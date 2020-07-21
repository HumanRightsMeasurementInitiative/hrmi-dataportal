const url = require('url');

const generatePDF = require('../test-pdf');

function handlePDF(req, res, next) {
  if (req.query && req.query.pdf === 'true') {
    // const fullRoute = req.protocol + '://' + req.get('host') + route
    // console.log(fullRoute)
    const fullRoute = `${req.protocol}://${req.get('host')}${
      url.parse(req.url).pathname
    }`;
    generatePDF(fullRoute)
      .then(pdf => {
        res.send(pdf);
      })
      .catch(error => {
        res.status(500).send({ error });
      });
  } else {
    next();
  }
}

module.exports = handlePDF;
