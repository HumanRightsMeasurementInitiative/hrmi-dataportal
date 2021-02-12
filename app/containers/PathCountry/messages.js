/*
 * PathCountry Messages
 *
 * This contains all the text for the PathCountry container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathCountry';

export default defineMessages({
  header: {
    a: {
      id: `${scope}.header.a`,
      defaultMessage:
        "How well {isPlural, select, true {are} false {is}} {countryWithArticle} respecting people's human rights?",
    },
    b: {
      id: `${scope}.header.b`,
      defaultMessage: 'Use the tabs below to explore the scores',
    },
  },
  countryScoreExplainer: {
    esr: {
      adjusted: {
        id: `${scope}.countryScoreExplainer.esr.adjusted`,
        defaultMessage:
          'On the {metric}, {countryWithArticle} {isPlural, select, true {are} false {is}} doing {score}% of what should be possible at {isPlural, select, true {their} false {its}} level of income (measured against the income-adjusted benchmark).',
      },
      best: {
        id: `${scope}.countryScoreExplainer.esr.best`,
        defaultMessage:
          'On the {metric}, {countryWithArticle} {isPlural, select, true {are} false {is}} doing {score}% of what should be possible at any income level (measured against the global best benchmark)',
      },
      'adjusted-subrights': {
        id: `${scope}.countryScoreExplainer.esr.adjusted-subrights`,
        defaultMessage:
          'On the right to {metric} score, {countryWithArticle} {isPlural, select, true {are} false {is}} doing {score}% of what should be possible at {isPlural, select, true {their} false {its}} level of income (measured against the income-adjusted benchmark).',
      },
      'best-subrights': {
        id: `${scope}.countryScoreExplainer.esr.best-subrights`,
        defaultMessage:
          'On the right to {metric} score, {countryWithArticle} {isPlural, select, true {are} false {is}} doing {score}% of what should be possible at any income level (measured against the global best benchmark)',
      },
    },
    cpr: {
      id: `${scope}.countryScoreExplainer.cpr`,
      defaultMessage:
        'On the {metric}, {countryWithArticle} {isPlural, select, true {have} false {has}} scores {score} out of 10, based on responses from our survey of <link>human rights experts</link>',
    },
    cprLink: {
      anchor: {
        id: `${scope}.countryScoreExplainer.cprLink.anchor`,
        defaultMessage: 'anchor',
      },
      url: {
        id: `${scope}.countryScoreExplainer.cprLink.url`,
        defaultMessage: 'url',
      },
    },
    noData: {
      id: `${scope}.countryScoreExplainer.noData`,
      defaultMessage: 'Score not available for {countryWithArticle}',
    },
  },
  indicatorScoreExplainer: {
    'net-primary': {
      id: `${scope}.indicatorScoreExplainer.net-primary`,
      defaultMessage:
        '{score}% of primary school aged children in {country} are enrolled in primary school.',
    },
    'sec-enrol': {
      id: `${scope}.indicatorScoreExplainer.sec-enrol`,
      defaultMessage:
        '{score}% of secondary school aged children in {country} are enrolled in secondary school.',
    },
    'pisa-math': {
      id: `${scope}.indicatorScoreExplainer.pisa-math`,
      defaultMessage:
        '{score}% of 15 year olds in {country} achieved level 3 or better on the PISA math test.',
    },
    'pisa-reading': {
      id: `${scope}.indicatorScoreExplainer.pisa-reading`,
      defaultMessage:
        '{score}% of 15 year olds in {country} achieved level 3 or better on the PISA reading test.',
    },
    'pisa-science': {
      id: `${scope}.indicatorScoreExplainer.pisa-science`,
      defaultMessage:
        '{score}% of 15 year olds in {country} achieved level 3 or better on the PISA science test.',
    },
    'not-stunted': {
      id: `${scope}.indicatorScoreExplainer.not-stunted`,
      defaultMessage:
        '{score}% of children under 5 in {country} are a healthy height for age, indicating they are receiving adequate nutrition.',
    },
    'food-security': {
      id: `${scope}.indicatorScoreExplainer.food-security`,
      defaultMessage:
        "{score}% of the population in {country} enjoy food security, according to FAO's Food Insecurity Experience Scale.",
    },
    'under-5-survival': {
      id: `${scope}.indicatorScoreExplainer.under-5-survival`,
      defaultMessage:
        '{score}% of children in {country} survive to their 5th birthday.',
    },
    'adult-survival': {
      id: `${scope}.indicatorScoreExplainer.adult-survival`,
      defaultMessage:
        '{score}% of youth aged 15 in {country} survive to at least age 60.',
    },
    contraception: {
      id: `${scope}.indicatorScoreExplainer.contraception`,
      defaultMessage:
        '{score}% of women or couples in {country} aged 15-49 use modern contraceptive methods.',
    },
    'birth-weight': {
      id: `${scope}.indicatorScoreExplainer.birth-weight`,
      defaultMessage:
        '{score}% of newborn babies in {country} weigh more than 2500 grams.',
    },
    'water-in-home': {
      id: `${scope}.indicatorScoreExplainer.water-in-home`,
      defaultMessage:
        '{score}% of people in {country} have access to a water source on their premises that is available when needed and free of contamination.',
    },
    'basic-sanitation': {
      id: `${scope}.indicatorScoreExplainer.basic-sanitation`,
      defaultMessage:
        '{score}% of people in {country} have access to sanitation facilities that are not shared with other households and hygienically separate excreta from human contact.',
    },
    'affordable-housing': {
      id: `${scope}.indicatorScoreExplainer.affordable-housing`,
      defaultMessage:
        '{score}% of people in the poorest population quintile in {country} live in a household where the cost of rent or mortgage is less than 40% of their disposable income.',
    },
    'safe-sanitation': {
      id: `${scope}.indicatorScoreExplainer.safe-sanitation`,
      defaultMessage:
        '{score}% of people in {country} have access to sanitation facilities that are not shared with other households; that hygienically separate excreta from human contact; and are either safely disposed in situ or transported and treated off site.',
    },
    'relative-poverty': {
      id: `${scope}.indicatorScoreExplainer.relative-poverty`,
      defaultMessage:
        '{score}% of people in {country} enjoy an income that is greater than 50% of the median income.',
    },
    'absolute-poverty': {
      id: `${scope}.indicatorScoreExplainer.absolute-poverty`,
      defaultMessage:
        '{score}% of people in {country} receive income greater than $3.20 ( 2011 PPP$) per day.',
    },
    'longterm-unemployment': {
      id: `${scope}.indicatorScoreExplainer.longterm-unemployment`,
      defaultMessage:
        '{score}% of the unemployed in {country} have been unemployed for fewer than 12 months.',
    },
  },
});
