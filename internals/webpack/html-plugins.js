const HtmlWebpackPlugin = require('html-webpack-plugin');
const pickBy = require('lodash/pickBy');
const flow = require('lodash/flow');
const mapKeys = require('lodash/mapKeys');
const keys = require('lodash/keys');

const langJSON = require('../../app/translations/en.json');

const getMessageName = data => mapKeys(data, (v, k) => k.split('.')[2]);

const getCountries = flow([
  data => pickBy(data, (v, k) => k.includes('hrmi.countries')),
  getMessageName,
]);

const getRights = flow([
  data =>
    pickBy(
      data,
      (v, k) =>
        k.includes('hrmi.rights.') &&
        !k.includes('job') &&
        !k.includes('union'), // N.B. note the dot following hrmi.rights.
    ),
  getMessageName,
]);

const getIndicators = flow([
  data =>
    pickBy(
      data,
      (v, k) => k.includes('hrmi.indicators.'), // N.B. note the dot following hrmi.indicators.
    ),
  getMessageName,
]);

const countries = getCountries(langJSON);
const rights = getRights(langJSON);
const indicators = getIndicators(langJSON);

const pages = { ...countries, ...rights, ...indicators };

// webpack
const htmlPlugins = keys(pages).map(
  code =>
    new HtmlWebpackPlugin({
      filename: `${code}.html`,
      template: `app/templates/${code}.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
);

module.exports = htmlPlugins;
