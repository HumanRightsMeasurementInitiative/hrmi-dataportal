/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const esLocaleData = require('react-intl/locale-data/es');
const ptLocaleData = require('react-intl/locale-data/pt');
const frLocaleData = require('react-intl/locale-data/fr');
const zhLocaleData = require('react-intl/locale-data/zh');
// one-off PDF translations
// const viLocaleData = require('react-intl/locale-data/vi');
// const koLocaleData = require('react-intl/locale-data/ko');
// const ruLocaleData = require('react-intl/locale-data/ru');
// const arLocaleData = require('react-intl/locale-data/ar');
// const hiLocaleData = require('react-intl/locale-data/hi');

const enTranslationMessages = require('./translations/en.json');
const esTranslationMessages = require('./translations/es.json');
const ptTranslationMessages = require('./translations/pt.json');
const frTranslationMessages = require('./translations/fr.json');
const zhTranslationMessages = require('./translations/zh.json');

// one-off PDF translations
// note we may use temp lang files specific to individual countries
// const viTranslationMessages = require('./translations/vi.json');
// const koTranslationMessages = require('./translations/ko.json');
// const ruKAZTranslationMessages = require('./translations/ru-KAZ.json');
// const ruKGZTranslationMessages = require('./translations/ru-KGZ.json');
// const arJORTranslationMessages = require('./translations/ar-JOR.json');
// const arSAUTranslationMessages = require('./translations/ar-SAU.json');
// const hiTranslationMessages = require('./translations/hi.json');
// const zhTCCHNTranslationMessages = require('./translations/zhTC-CHN.json');
// const zhTCHKGTranslationMessages = require('./translations/zhTC-HKG.json');
// const zhTCTWNTranslationMessages = require('./translations/zhTC-TWN.json');

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);
addLocaleData(ptLocaleData);
addLocaleData(frLocaleData);
addLocaleData(zhLocaleData);

// addLocaleData(viLocaleData);
// addLocaleData(koLocaleData);
// addLocaleData(ruLocaleData);
// addLocaleData(arLocaleData);
// addLocaleData(hiLocaleData);

const DEFAULT_LOCALE = 'en';

// prettier-ignore
const appLocales = [
  'en',
  'es',
  'pt',
  'fr',
  'zh',
  // 'vi',
  // 'ko',
  // 'ru',
  // 'ar',
  // 'hi',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es:
    esTranslationMessages &&
    formatTranslationMessages('es', esTranslationMessages),
  pt:
    ptTranslationMessages &&
    formatTranslationMessages('pt', ptTranslationMessages),
  fr:
    frTranslationMessages &&
    formatTranslationMessages('fr', frTranslationMessages),
  // vi:
  //   viTranslationMessages &&
  //   formatTranslationMessages('vi', viTranslationMessages),
  // ko:
  //   koTranslationMessages &&
  //   formatTranslationMessages('ko', koTranslationMessages),
  // ru:
  //   ruKAZTranslationMessages &&
  //   formatTranslationMessages('ru', ruKAZTranslationMessages),
  // ru:
  //   ruKGZTranslationMessages &&
  //   formatTranslationMessages('ru', ruKGZTranslationMessages),
  // ar:
  //   arJORTranslationMessages &&
  //   formatTranslationMessages('ar', arJORTranslationMessages),
  // ar:
  //   arSAUTranslationMessages &&
  //   formatTranslationMessages('ar', arSAUTranslationMessages),
  // hi:
  //   hiTranslationMessages &&
  //   formatTranslationMessages('hi', hiTranslationMessages),
  zh:
    zhTranslationMessages &&
    formatTranslationMessages('zh', zhTranslationMessages),
  // zh:
  //   zhTCCHNTranslationMessages &&
  //   formatTranslationMessages('zh', zhTCCHNTranslationMessages),
  // zh:
  //   zhTCHKGTranslationMessages &&
  //   formatTranslationMessages('zh', zhTCHKGTranslationMessages),
  // zh:
  //   zhTCTWNTranslationMessages &&
  //   formatTranslationMessages('zh', zhTCTWNTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
