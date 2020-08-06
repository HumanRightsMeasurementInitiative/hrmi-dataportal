const HtmlWebpackPlugin = require('html-webpack-plugin');
const keys = require('lodash/keys');

const {
  getCountries,
  getIndicators,
  getRights,
} = require('../scripts/helpers/generate-files');

const langJSON = require('../../app/translations/en.json');

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
