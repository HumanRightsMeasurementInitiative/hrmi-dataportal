const HtmlWebpackPlugin = require('html-webpack-plugin');
const pickBy = require('lodash/pickBy');
const flow = require('lodash/flow');
const mapKeys = require('lodash/mapKeys');
const keys = require('lodash/keys');

const langJSON = require('../../app/translations/en.json');

const getCountries = flow([
  data => pickBy(data, (v, k) => k.includes('hrmi.countries')),
  data => mapKeys(data, (v, k) => k.split('.')[2]),
]);

const countries = getCountries(langJSON);

// webpack
const htmlPlugins = keys(countries).map(
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
