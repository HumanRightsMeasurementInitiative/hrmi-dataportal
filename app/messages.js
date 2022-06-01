/*
 * Global Messages
 *
 * This contains all the text for the Country container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi';

export default defineMessages({
  app: {
    title: {
      id: `${scope}.app.title`,
      defaultMessage: 'Rights Tracker',
    },
    hrmi: {
      id: `${scope}.app.hrmi`,
      defaultMessage: 'Humen Rights Measurement Initiative',
    },
    claim: {
      id: `${scope}.app.claim`,
      defaultMessage: 'Measuring What Matters',
    },
    metaTitle: {
      id: `${scope}.app.metaTitle`,
      defaultMessage: 'HRMI Rights Tracker',
    },
    metaDescription: {
      id: `${scope}.app.metaDescription`,
      defaultMessage: 'HRMI Rights Tracker - Measuring what matters',
    },
  },
  hints: {
    noResults: {
      id: `${scope}.hints.noResults`,
      defaultMessage:
        'We could not find any countries for your filter settings',
    },
    noSortData: {
      id: `${scope}.hints.noSortData`,
      defaultMessage: 'Sorting information missing',
    },
    settings: {
      id: `${scope}.hints.settings`,
      defaultMessage:
        "To change the performance benchmark or assessment standard, please click on 'Switch View' above",
    },
    noAtRiskData: {
      id: `${scope}.hints.noAtRiskData`,
      defaultMessage:
        'Information on which people are at extra risk of rights violations comes from our annual expert survey, and is not yet available for {country}',
    },
  },
  labels: {
    score: {
      id: `${scope}.labels.score`,
      defaultMessage: 'Score',
    },
    hiCountry: {
      id: `${scope}.labels.hiCountry`,
      defaultMessage: 'HI',
    },
    govResponseCountry: {
      id: `${scope}.labels.govResponseCountry`,
      defaultMessage: 'g',
    },
    better: {
      id: `${scope}.labels.better`,
      defaultMessage: 'Better',
    },
    worse: {
      id: `${scope}.labels.worse`,
      defaultMessage: 'Worse',
    },
    loading: {
      id: `${scope}.labels.loading`,
      defaultMessage: 'Loading...',
    },
    atRiksFor: {
      id: `${scope}.labels.atRiskFor`,
      defaultMessage: 'People at risk for',
    },
    allCountries: {
      id: `${scope}.labels.allCountries`,
      defaultMessage: 'All countries',
    },
    allMetrics: {
      id: `${scope}.labels.allMetrics`,
      defaultMessage: 'All metrics',
    },
    allPeople: {
      id: `${scope}.labels.allPeople`,
      defaultMessage: 'All people',
    },
    countries: {
      id: `${scope}.labels.countries`,
      defaultMessage: 'Countries',
    },
    metrics: {
      id: `${scope}.labels.metrics`,
      defaultMessage: 'Metrics',
    },
    people: {
      id: `${scope}.labels.people`,
      defaultMessage: 'People',
    },
    grades: {
      poor: {
        id: `${scope}.labels.grades.poor`,
        defaultMessage: 'Very Bad',
      },
      bad: {
        id: `${scope}.labels.grades.bad`,
        defaultMessage: 'Bad',
      },
      fair: {
        id: `${scope}.labels.grades.fair`,
        defaultMessage: 'Fair',
      },
      good: {
        id: `${scope}.labels.grades.good`,
        defaultMessage: 'Good',
      },
    },
    chartTools: {
      howToRead: {
        id: `${scope}.labels.chartTools.howToRead`,
        defaultMessage: 'How to read',
      },
      settings: {
        id: `${scope}.labels.chartTools.settings`,
        defaultMessage: 'Data settings',
      },
      downloadPDF: {
        id: `${scope}.labels.chartTools.downloadPDF`,
        defaultMessage: 'Download PDF',
      },
      downloadPDFvi: {
        id: `${scope}.labels.chartTools.downloadPDFvi`,
        defaultMessage: 'Download PDF in Vietnamese',
      },
      downloadPDFko: {
        id: `${scope}.labels.chartTools.downloadPDFko`,
        defaultMessage: 'Download PDF in Korean',
      },
      downloadPDFru: {
        id: `${scope}.labels.chartTools.downloadPDFru`,
        defaultMessage: 'Download PDF in Russian',
      },
      downloadPDFar: {
        id: `${scope}.labels.chartTools.downloadPDFar`,
        defaultMessage: 'Download PDF in Arabic',
      },
    },
    abbrev: {
      notAvailable: {
        id: `${scope}.labels.abbrev.notAvailable`,
        defaultMessage: `${scope}.labels.abbrev.notAvailable`,
      },
    },
    xAxis: {
      cpr: {
        id: `${scope}.labels.xAxis.cpr`,
        defaultMessage: 'Score',
      },
      adjusted: {
        id: `${scope}.labels.xAxis.adjusted`,
        defaultMessage: '% of income adjusted benchmark achieved',
      },
      best: {
        id: `${scope}.labels.xAxis.best`,
        defaultMessage: '% of global best benchmark achieved',
      },
      hrmiscore: {
        id: `${scope}.labels.xAxis.hrmiscore`,
        defaultMessage: 'HRMI score',
      },
    },
    indicatorToggles: {
      hrmi: {
        id: `${scope}.labels.indicatorToggles.hrmi`,
        defaultMessage: 'HRMI {isPlural, select, true {scores} false {score}}',
      },
      indicator: {
        id: `${scope}.labels.indicatorToggles.indicator`,
        defaultMessage:
          'Indicator {isPlural, select, true {values} false {value}}',
      },
    },
  },
  assessedFilters: {
    all: {
      id: `${scope}.assessedFilters.all`,
      defaultMessage: 'All rights',
    },
    'cpr-all': {
      id: `${scope}.assessedFilters.cpr-all`,
      defaultMessage: 'All CPR',
    },
    'esr-all': {
      id: `${scope}.assessedFilters.esr-all`,
      defaultMessage: 'All ESR',
    },
    some: {
      id: `${scope}.assessedFilters.some`,
      defaultMessage: 'Some rights',
    },
  },
  tabs: {
    snapshot: {
      id: `${scope}.tabs.snapshot`,
      defaultMessage: 'Snapshot',
    },
    esr: {
      id: `${scope}.tabs.esr`,
      defaultMessage: 'Quality of Life',
    },
    physint: {
      id: `${scope}.tabs.physint`,
      defaultMessage: 'Safety from the State',
    },
    empowerment: {
      id: `${scope}.tabs.empowerment`,
      defaultMessage: 'Empowerment',
    },
    'people-at-risk': {
      id: `${scope}.tabs.people-at-risk`,
      defaultMessage: 'People at risk',
    },
    pacific: {
      id: `${scope}.tabs.pacific`,
      defaultMessage: 'Pacific Region Data',
    },
    about: {
      id: `${scope}.tabs.about`,
      defaultMessage: 'About',
    },
    mobile: {
      snapshot: {
        id: `${scope}.tabs.mobile.snapshot`,
        defaultMessage: 'Snapshot',
      },
      esr: {
        id: `${scope}.tabs.mobile.esr`,
        defaultMessage: 'Quality of Life',
      },
      physint: {
        id: `${scope}.tabs.mobile.physint`,
        defaultMessage: 'Safety from the State',
      },
      empowerment: {
        id: `${scope}.tabs.mobile.empowerment`,
        defaultMessage: 'Empowerment',
      },
      'people-at-risk': {
        id: `${scope}.tabs.mobile.people-at-risk`,
        defaultMessage: 'People at risk',
      },
      about: {
        id: `${scope}.tabs.mobile.about`,
        defaultMessage: 'About',
      },
    },
  },
  charts: {
    dimensionSummaryLabel: {
      id: `${scope}.charts.dimensionSummaryLabel`,
      defaultMessage: 'Summary Score',
    },
    rightsColumnLabel: {
      esr: {
        id: `${scope}.charts.rightsColumnLabel.esr`,
        defaultMessage: 'Right to',
      },
      empowerment: {
        id: `${scope}.charts.rightsColumnLabel.empowerment`,
        defaultMessage: 'Right to',
      },
      physint: {
        id: `${scope}.charts.rightsColumnLabel.physint`,
        defaultMessage: 'Right to freedom from',
      },
    },
    indicatorsColumnLabel: {
      id: `${scope}.charts.indicatorsColumnLabel`,
      defaultMessage: 'Indicators',
    },
    sexLabel: {
      id: `${scope}.charts.sexLabel`,
      defaultMessage: 'By sex',
    },
    noData: {
      id: `${scope}.charts.noData`,
      defaultMessage: 'No data',
    },
    noDataForStandard: {
      id: `${scope}.charts.noDataForStandard`,
      defaultMessage: 'No data for standard',
    },
    incompleteData: {
      id: `${scope}.charts.incompleteData`,
      defaultMessage: 'Incomplete data',
      drillDownIndicators: {
        id: `${scope}.charts.incompleteData.drillDownIndicators`,
        defaultMessage: 'explore indicator data',
      },
      drillDownRights: {
        id: `${scope}.charts.incompleteData.drillDownRights`,
        defaultMessage: 'drillDownRights',
      },
      changeStandard: {
        id: `${scope}.charts.incompleteData.changeStandard`,
        defaultMessage: 'changeStandard',
      },
      changeScale: {
        id: `${scope}.charts.incompleteData.changeScale`,
        defaultMessage: 'changeScale',
      },
      scrollDown: {
        id: `${scope}.charts.incompleteData.scrollDown`,
        defaultMessage: 'scrollDown',
      },
      viewCountry: {
        id: `${scope}.charts.incompleteData.viewCountry`,
        defaultMessage: 'view country',
      },
    },
    dimensionIntro: {
      esr: {
        adjusted: {
          id: `${scope}.charts.dimensionIntro.esr.adjusted`,
          defaultMessage:
            'How well {isPlural, select, true {are} false {is}} {countryWithArticle} doing compared to what is possible at {isPlural, select, true {their} false {its}} level of income?',
        },
        best: {
          id: `${scope}.charts.dimensionIntro.esr.best`,
          defaultMessage:
            'How well {isPlural, select, true {are} false {is}} {countryWithArticle} doing compared to the best in the world?',
        },
      },
      physint: {
        id: `${scope}.charts.dimensionIntro.physint`,
        defaultMessage:
          'How well is {needsArticle, select, true {the } false { }}{countryPossessive} government respecting each right?',
      },
      empowerment: {
        id: `${scope}.charts.dimensionIntro.empowerment`,
        defaultMessage:
          'How well is {needsArticle, select, true {the } false { }}{countryPossessive} government respecting each right?',
      },
    },
    dimensionDataSource: {
      esr: {
        id: `${scope}.charts.dimensionDataSource.esr`,
        defaultMessage:
          '(Charts show most recent data available as of {year}).',
      },
      cpr: {
        id: `${scope}.charts.dimensionDataSource.cpr`,
        defaultMessage: 'Scores show data from {year}.',
      },
    },
  },
  settings: {
    scale: {
      name: {
        id: `${scope}.settings.scale.name`,
        defaultMessage: 'Metric scale',
      },
      intro: {
        id: `${scope}.settings.scale.intro`,
        defaultMessage: 'About scale',
      },
      dimensions: {
        id: `${scope}.settings.scale.dimensions`,
        defaultMessage: 'Categories',
      },
      rights: {
        id: `${scope}.settings.scale.rights`,
        defaultMessage: 'Rights',
      },
      dimensionsInfo: {
        id: `${scope}.settings.scale.dimensionsInfo`,
        defaultMessage: 'Categories Info',
      },
      rightsInfo: {
        id: `${scope}.settings.scale.rightsInfo`,
        defaultMessage: 'Rights Info',
      },
    },
    standard: {
      name: {
        id: `${scope}.settings.standard.name`,
        defaultMessage: 'Assessment standard',
      },
      intro: {
        id: `${scope}.settings.standard.intro`,
        defaultMessage:
          'For the quality of life rights we have two assessment standards.',
      },
      core: {
        id: `${scope}.settings.standard.core`,
        defaultMessage: 'Low and middle income',
      },
      hi: {
        id: `${scope}.settings.standard.hi`,
        defaultMessage: 'High income',
      },
      coreInfo: {
        id: `${scope}.settings.standard.coreInfo`,
        defaultMessage:
          'Uses statistical indicators that are available for most countries in the world, particularly low and middle income countries.',
      },
      hiInfo: {
        id: `${scope}.settings.standard.hiInfo`,
        defaultMessage:
          'Uses indicators that are available for fewer countries, and/or better reflect the human rights challenges of high-income countries.',
      },
    },
    benchmark: {
      name: {
        id: `${scope}.settings.benchmark.name`,
        defaultMessage: 'Performance benchmark',
      },
      nameShort: {
        id: `${scope}.settings.benchmark.nameShort`,
        defaultMessage: 'Benchmark',
      },
      adjusted: {
        id: `${scope}.settings.benchmark.adjusted`,
        defaultMessage: 'Income-adjusted',
      },
      best: {
        id: `${scope}.settings.benchmark.best`,
        defaultMessage: 'Global best',
      },
      min: {
        id: `${scope}.settings.benchmark.min`,
        defaultMessage: 'Natural minimum',
      },
      intro: {
        id: `${scope}.settings.benchmark.intro`,
        defaultMessage:
          'For the quality of life rights, HRMI measures countries against 2 different benchmarks.',
      },
      introSingle: {
        id: `${scope}.settings.benchmark.introSingle`,
        defaultMessage:
          'For the quality of life rights, HRMI measures countries against 2 different benchmarks. The current benchmark is:',
      },
      adjustedInfo: {
        id: `${scope}.settings.benchmark.adjustedInfo`,
        defaultMessage:
          'How well is the country doing compared to the best performance of other countries at roughly the same income level?',
      },
      bestInfo: {
        id: `${scope}.settings.benchmark.bestInfo`,
        defaultMessage:
          'How well is the country doing compared to the best performance of all countries?',
      },
    },
    dataYear: {
      present: {
        id: `${scope}.settings.dataYear.present`,
        defaultMessage: 'Score based on data from specified year',
      },
      previous: {
        id: `${scope}.settings.dataYear.previous`,
        defaultMessage: 'Score based on data from earlier year',
      },
      presentShort: {
        id: `${scope}.settings.dataYear.presentShort`,
        defaultMessage: 'Specified year data',
      },
      previousShort: {
        id: `${scope}.settings.dataYear.previousShort`,
        defaultMessage: 'Previous year data',
      },
    },
    groups: {
      name: {
        id: `${scope}.settings.groups.name`,
        defaultMessage: 'Groups',
      },
      nameShort: {
        id: `${scope}.settings.groups.nameShort`,
        defaultMessage: 'Groups',
      },
    },
    value: {
      note: {
        id: `${scope}.settings.value.note`,
        defaultMessage:
          'Note: raw indicator values are first converted into scores and then aggregated into the right score',
      },
      score: {
        id: `${scope}.settings.value.score`,
        defaultMessage: 'Scores',
      },
      raw: {
        id: `${scope}.settings.value.raw`,
        defaultMessage: 'Raw values',
      },
    },
  },
  groups: {
    all: {
      id: `${scope}.groups.all`,
      defaultMessage: 'All people',
    },
    female: {
      id: `${scope}.groups.female`,
      defaultMessage: 'Female',
    },
    male: {
      id: `${scope}.groups.male`,
      defaultMessage: 'Male',
    },
  },
  metricTypes: {
    dimensions: {
      id: `${scope}.metricTypes.dimensions`,
      defaultMessage: 'Categories of Rights',
    },
    'dimensions-short': {
      id: `${scope}.metricTypes.dimensions-short`,
      defaultMessage: 'Categories',
    },
    rights: {
      id: `${scope}.metricTypes.rights`,
      defaultMessage: 'Rights',
    },
    indicators: {
      id: `${scope}.metricTypes.indicators`,
      defaultMessage: 'Indicators',
    },
    dimension: {
      id: `${scope}.metricTypes.dimension`,
      defaultMessage: 'Category of Rights',
    },
    'dimension-short': {
      id: `${scope}.metricTypes.dimensions-short`,
      defaultMessage: 'Category',
    },
    right: {
      id: `${scope}.metricTypes.right`,
      defaultMessage: 'Right',
    },
    indicator: {
      id: `${scope}.metricTypes.indicator`,
      defaultMessage: 'Indicator',
    },
  },
  page: {
    about: {
      id: `${scope}.page.about`,
      defaultMessage: 'About',
    },
    methodology: {
      id: `${scope}.page.methodology`,
      defaultMessage: 'Methodology',
    },
    download: {
      id: `${scope}.page.download`,
      defaultMessage: 'Download Data',
    },
    'at-risk': {
      id: `${scope}.page.at-risk`,
      defaultMessage: 'Groups at risk',
    },
  },
  'people-at-risk': {
    0: {
      id: `${scope}.people-at-risk.0`,
      defaultMessage: 'People 0',
    },
    1: {
      id: `${scope}.people-at-risk.1`,
      defaultMessage: 'People 1',
    },
    2: {
      id: `${scope}.people-at-risk.2`,
      defaultMessage: 'People 2',
    },
    3: {
      id: `${scope}.people-at-risk.3`,
      defaultMessage: 'People 3',
    },
    4: {
      id: `${scope}.people-at-risk.4`,
      defaultMessage: 'People 4',
    },
    5: {
      id: `${scope}.people-at-risk.5`,
      defaultMessage: 'People 5',
    },
    6: {
      id: `${scope}.people-at-risk.6`,
      defaultMessage: 'People 6',
    },
    7: {
      id: `${scope}.people-at-risk.7`,
      defaultMessage: 'People 7',
    },
    8: {
      id: `${scope}.people-at-risk.8`,
      defaultMessage: 'People 8',
    },
    9: {
      id: `${scope}.people-at-risk.9`,
      defaultMessage: 'People 9',
    },
    '9a': {
      id: `${scope}.people-at-risk.9a`,
      defaultMessage: 'People 9a',
    },
    10: {
      id: `${scope}.people-at-risk.10`,
      defaultMessage: 'People 10',
    },
    11: {
      id: `${scope}.people-at-risk.11`,
      defaultMessage: 'People 11',
    },
    12: {
      id: `${scope}.people-at-risk.12`,
      defaultMessage: 'People 12',
    },
    13: {
      id: `${scope}.people-at-risk.13`,
      defaultMessage: 'People 13',
    },
    14: {
      id: `${scope}.people-at-risk.14`,
      defaultMessage: 'People 14',
    },
    15: {
      id: `${scope}.people-at-risk.15`,
      defaultMessage: 'People 15',
    },
    16: {
      id: `${scope}.people-at-risk.16`,
      defaultMessage: 'People 16',
    },
    17: {
      id: `${scope}.people-at-risk.17`,
      defaultMessage: 'People 17',
    },
    18: {
      id: `${scope}.people-at-risk.18`,
      defaultMessage: 'People 18',
    },
    19: {
      id: `${scope}.people-at-risk.19`,
      defaultMessage: 'People 19',
    },
    20: {
      id: `${scope}.people-at-risk.20`,
      defaultMessage: 'People 20',
    },
    21: {
      id: `${scope}.people-at-risk.21`,
      defaultMessage: 'People 21',
    },
    22: {
      id: `${scope}.people-at-risk.22`,
      defaultMessage: 'People 22',
    },
    23: {
      id: `${scope}.people-at-risk.23`,
      defaultMessage: 'People 23',
    },
    24: {
      id: `${scope}.people-at-risk.24`,
      defaultMessage: 'People 24',
    },
    25: {
      id: `${scope}.people-at-risk.25`,
      defaultMessage: 'People 25',
    },
    26: {
      id: `${scope}.people-at-risk.26`,
      defaultMessage: 'People 26',
    },
    27: {
      id: `${scope}.people-at-risk.27`,
      defaultMessage: 'People 27',
    },
    28: {
      id: `${scope}.people-at-risk.28`,
      defaultMessage: 'People 28',
    },
    29: {
      id: `${scope}.people-at-risk.29`,
      defaultMessage: 'People 29',
    },
    30: {
      id: `${scope}.people-at-risk.30`,
      defaultMessage: 'People 30',
    },
    31: {
      id: `${scope}.people-at-risk.31`,
      defaultMessage: 'People 31',
    },
    32: {
      id: `${scope}.people-at-risk.32`,
      defaultMessage: 'People 32',
    },
    33: {
      id: `${scope}.people-at-risk.33`,
      defaultMessage: 'People 33',
    },
    34: {
      id: `${scope}.people-at-risk.34`,
      defaultMessage: 'People 34',
    },
    35: {
      id: `${scope}.people-at-risk.35`,
      defaultMessage: 'People 35',
    },
    36: {
      id: `${scope}.people-at-risk.36`,
      defaultMessage: 'People 36',
    },
    37: {
      id: `${scope}.people-at-risk.37`,
      defaultMessage: 'People 37',
    },
    38: {
      id: `${scope}.people-at-risk.38`,
      defaultMessage: 'People 38',
    },
    39: {
      id: `${scope}.people-at-risk.39`,
      defaultMessage: 'People 39',
    },
  },
  'people-at-risk-intro': {
    0: {
      id: `${scope}.people-at-risk-intro.0`,
      defaultMessage: 'People 0',
    },
    1: {
      id: `${scope}.people-at-risk-intro.1`,
      defaultMessage: 'People 1',
    },
    2: {
      id: `${scope}.people-at-risk-intro.2`,
      defaultMessage: 'People 2',
    },
    3: {
      id: `${scope}.people-at-risk-intro.3`,
      defaultMessage: 'People 3',
    },
    4: {
      id: `${scope}.people-at-risk-intro.4`,
      defaultMessage: 'People 4',
    },
    5: {
      id: `${scope}.people-at-risk-intro.5`,
      defaultMessage: 'People 5',
    },
    6: {
      id: `${scope}.people-at-risk-intro.6`,
      defaultMessage: 'People 6',
    },
    7: {
      id: `${scope}.people-at-risk-intro.7`,
      defaultMessage: 'People 7',
    },
    8: {
      id: `${scope}.people-at-risk-intro.8`,
      defaultMessage: 'People 8',
    },
    9: {
      id: `${scope}.people-at-risk-intro.9`,
      defaultMessage: 'People 9',
    },
    10: {
      id: `${scope}.people-at-risk-intro.10`,
      defaultMessage: 'People 10',
    },
    11: {
      id: `${scope}.people-at-risk-intro.11`,
      defaultMessage: 'People 11',
    },
    12: {
      id: `${scope}.people-at-risk-intro.12`,
      defaultMessage: 'People 12',
    },
    13: {
      id: `${scope}.people-at-risk-intro.13`,
      defaultMessage: 'People 13',
    },
    14: {
      id: `${scope}.people-at-risk-intro.14`,
      defaultMessage: 'People 14',
    },
    15: {
      id: `${scope}.people-at-risk-intro.15`,
      defaultMessage: 'People 15',
    },
    16: {
      id: `${scope}.people-at-risk-intro.16`,
      defaultMessage: 'People 16',
    },
    17: {
      id: `${scope}.people-at-risk-intro.17`,
      defaultMessage: 'People 17',
    },
    18: {
      id: `${scope}.people-at-risk-intro.18`,
      defaultMessage: 'People 18',
    },
    19: {
      id: `${scope}.people-at-risk-intro.19`,
      defaultMessage: 'People 19',
    },
    20: {
      id: `${scope}.people-at-risk-intro.20`,
      defaultMessage: 'People 20',
    },
    21: {
      id: `${scope}.people-at-risk-intro.21`,
      defaultMessage: 'People 21',
    },
    22: {
      id: `${scope}.people-at-risk-intro.22`,
      defaultMessage: 'People 22',
    },
    23: {
      id: `${scope}.people-at-risk-intro.23`,
      defaultMessage: 'People 23',
    },
    24: {
      id: `${scope}.people-at-risk-intro.24`,
      defaultMessage: 'People 24',
    },
    25: {
      id: `${scope}.people-at-risk-intro.25`,
      defaultMessage: 'People 25',
    },
    26: {
      id: `${scope}.people-at-risk-intro.26`,
      defaultMessage: 'People 26',
    },
    27: {
      id: `${scope}.people-at-risk-intro.27`,
      defaultMessage: 'People 27',
    },
    28: {
      id: `${scope}.people-at-risk-intro.28`,
      defaultMessage: 'People 28',
    },
    29: {
      id: `${scope}.people-at-risk-intro.29`,
      defaultMessage: 'People 29',
    },
    30: {
      id: `${scope}.people-at-risk-intro.30`,
      defaultMessage: 'People 30',
    },
    31: {
      id: `${scope}.people-at-risk-intro.31`,
      defaultMessage: 'People 31',
    },
  },
  'rights-types': {
    cpr: {
      id: `${scope}.rights-types.cpr`,
      defaultMessage: 'cpr',
    },
    esr: {
      id: `${scope}.rights-types.esr`,
      defaultMessage: 'esr',
    },
  },
  dimensions: {
    esr: {
      id: `${scope}.dimensions.esr`,
      defaultMessage: 'esr',
    },
    empowerment: {
      id: `${scope}.dimensions.empowerment`,
      defaultMessage: 'empowerment',
    },
    physint: {
      id: `${scope}.dimensions.physint`,
      defaultMessage: 'physint',
    },
    'esr-sub': {
      id: `${scope}.dimensions.esr-sub`,
      defaultMessage: '(5 economic and social rights)',
    },
    'empowerment-sub': {
      id: `${scope}.dimensions.empowerment-sub`,
      defaultMessage: '(3 empowerment rights)',
    },
    'physint-sub': {
      id: `${scope}.dimensions.physint-sub`,
      defaultMessage: '(5 physical integrity rights)',
    },
  },
  'dimensions-about': {
    esr: {
      id: `${scope}.dimensions-about.esr`,
      defaultMessage: 'about esr',
    },
    empowerment: {
      id: `${scope}.dimensions-about.empowerment`,
      defaultMessage: 'empowerment-about',
    },
    physint: {
      id: `${scope}.dimensions-about.physint`,
      defaultMessage: 'physint-about',
    },
  },
  rights: {
    arrest: {
      id: `${scope}.rights.arrest`,
      defaultMessage: 'arrest',
    },
    assembly: {
      id: `${scope}.rights.assembly`,
      defaultMessage: 'assembly',
    },
    disappearance: {
      id: `${scope}.rights.disappearance`,
      defaultMessage: 'disappearance',
    },
    'death-penalty': {
      id: `${scope}.rights.death-penalty`,
      defaultMessage: 'death-penalty',
    },
    'extrajud-killing': {
      id: `${scope}.rights.extrajud-killing`,
      defaultMessage: 'extrajud-killing',
    },
    expression: {
      id: `${scope}.rights.expression`,
      defaultMessage: 'expression',
    },
    participation: {
      id: `${scope}.rights.participation`,
      defaultMessage: 'participation',
    },
    torture: {
      id: `${scope}.rights.torture`,
      defaultMessage: 'torture',
    },
    education: {
      id: `${scope}.rights.education`,
      defaultMessage: 'education',
    },
    food: {
      id: `${scope}.rights.food`,
      defaultMessage: 'food',
    },
    health: {
      id: `${scope}.rights.health`,
      defaultMessage: 'health',
    },
    housing: {
      id: `${scope}.rights.housing`,
      defaultMessage: 'housing',
    },
    work: {
      id: `${scope}.rights.work`,
      defaultMessage: 'work',
    },
    job: {
      id: `${scope}.rights.job`,
      defaultMessage: 'job',
    },
    jobcond: {
      id: `${scope}.rights.jobcond`,
      defaultMessage: 'jobcond',
    },
    union: {
      id: `${scope}.rights.union`,
      defaultMessage: 'union',
    },
    violence: {
      id: `${scope}.rights.violence`,
      defaultMessage: 'violence',
    },
  },
  'rights-short': {
    arrest: {
      id: `${scope}.rights-short.arrest`,
      defaultMessage: 'arrest',
    },
    assembly: {
      id: `${scope}.rights-short.assembly`,
      defaultMessage: 'assembly',
    },
    disappearance: {
      id: `${scope}.rights-short.disappearance`,
      defaultMessage: 'disappearance',
    },
    'death-penalty': {
      id: `${scope}.rights-short.death-penalty`,
      defaultMessage: 'death-penalty',
    },
    'extrajud-killing': {
      id: `${scope}.rights-short.extrajud-killing`,
      defaultMessage: 'extrajud-killing',
    },
    expression: {
      id: `${scope}.rights-short.expression`,
      defaultMessage: 'expression',
    },
    participation: {
      id: `${scope}.rights-short.participation`,
      defaultMessage: 'participation',
    },
    torture: {
      id: `${scope}.rights-short.torture`,
      defaultMessage: 'torture',
    },
    education: {
      id: `${scope}.rights-short.education`,
      defaultMessage: 'education',
    },
    food: {
      id: `${scope}.rights-short.food`,
      defaultMessage: 'food',
    },
    health: {
      id: `${scope}.rights-short.health`,
      defaultMessage: 'health',
    },
    housing: {
      id: `${scope}.rights-short.housing`,
      defaultMessage: 'housing',
    },
    work: {
      id: `${scope}.rights-short.work`,
      defaultMessage: 'work',
    },
    job: {
      id: `${scope}.rights-short.job`,
      defaultMessage: 'job',
    },
    jobcond: {
      id: `${scope}.rights-short.jobcond`,
      defaultMessage: 'jobcond',
    },
    union: {
      id: `${scope}.rights-short.union`,
      defaultMessage: 'union',
    },
  },
  'rights-xshort': {
    arrest: {
      id: `${scope}.rights-xshort.arrest`,
      defaultMessage: 'arrest',
    },
    assembly: {
      id: `${scope}.rights-xshort.assembly`,
      defaultMessage: 'assembly',
    },
    disappearance: {
      id: `${scope}.rights-xshort.disappearance`,
      defaultMessage: 'disappearance',
    },
    'death-penalty': {
      id: `${scope}.rights-xshort.death-penalty`,
      defaultMessage: 'death-penalty',
    },
    'extrajud-killing': {
      id: `${scope}.rights-xshort.extrajud-killing`,
      defaultMessage: 'extrajud-killing',
    },
    expression: {
      id: `${scope}.rights-xshort.expression`,
      defaultMessage: 'expression',
    },
    participation: {
      id: `${scope}.rights-xshort.participation`,
      defaultMessage: 'participation',
    },
    torture: {
      id: `${scope}.rights-xshort.torture`,
      defaultMessage: 'torture',
    },
    education: {
      id: `${scope}.rights-xshort.education`,
      defaultMessage: 'education',
    },
    food: {
      id: `${scope}.rights-xshort.food`,
      defaultMessage: 'food',
    },
    health: {
      id: `${scope}.rights-short.health`,
      defaultMessage: 'health',
    },
    housing: {
      id: `${scope}.rights-xshort.housing`,
      defaultMessage: 'housing',
    },
    work: {
      id: `${scope}.rights-xshort.work`,
      defaultMessage: 'work',
    },
    job: {
      id: `${scope}.rights-xshort.job`,
      defaultMessage: 'job',
    },
    jobcond: {
      id: `${scope}.rights-xshort.jobcond`,
      defaultMessage: 'jobcond',
    },
    union: {
      id: `${scope}.rights-xshort.union`,
      defaultMessage: 'union',
    },
  },
  'rights-about': {
    arrest: {
      id: `${scope}.rights-about.arrest`,
      defaultMessage: 'arrest-about',
    },
    assembly: {
      id: `${scope}.rights-about.assembly`,
      defaultMessage: 'assembly-about',
    },
    disappearance: {
      id: `${scope}.rights-about.disappearance`,
      defaultMessage: 'disappearance-about',
    },
    'death-penalty': {
      id: `${scope}.rights-about.death-penalty`,
      defaultMessage: 'death-penalty-about',
    },
    'extrajud-killing': {
      id: `${scope}.rights-about.extrajud-killing`,
      defaultMessage: 'extrajud-killing-about',
    },
    expression: {
      id: `${scope}.rights-about.expression`,
      defaultMessage: 'expression-about',
    },
    participation: {
      id: `${scope}.rights-about.participation`,
      defaultMessage: 'participation-about',
    },
    torture: {
      id: `${scope}.rights-about.torture`,
      defaultMessage: 'torture-about',
    },
    education: {
      id: `${scope}.rights-about.education`,
      defaultMessage: 'education-about',
    },
    food: {
      id: `${scope}.rights-about.food`,
      defaultMessage: 'food-about',
    },
    health: {
      id: `${scope}.rights-about.health`,
      defaultMessage: 'health-about',
    },
    housing: {
      id: `${scope}.rights-about.housing`,
      defaultMessage: 'housing-about',
    },
    work: {
      id: `${scope}.rights-about.work`,
      defaultMessage: 'work-about',
    },
    job: {
      id: `${scope}.rights-about.job`,
      defaultMessage: 'job-about',
    },
    jobcond: {
      id: `${scope}.rights-about.jobcond`,
      defaultMessage: 'jobcond-about',
    },
    union: {
      id: `${scope}.rights-about.union`,
      defaultMessage: 'union-about',
    },
  },
  indicators: {
    'net-primary': {
      id: `${scope}.indicators.net-primary`,
      defaultMessage: 'net-primary',
    },
    'sec-enrol': {
      id: `${scope}.indicators.sec-enrol`,
      defaultMessage: 'sec-enrol',
    },
    'pisa-science': {
      id: `${scope}.indicators.pisa-science`,
      defaultMessage: 'pisa-science',
    },
    'pisa-math': {
      id: `${scope}.indicators.pisa-math`,
      defaultMessage: 'pisa-math',
    },
    'pisa-reading': {
      id: `${scope}.indicators.pisa-reading`,
      defaultMessage: 'pisa-reading',
    },
    'not-stunted': {
      id: `${scope}.indicators.not-stunted`,
      defaultMessage: 'not-stunted',
    },
    'food-security': {
      id: `${scope}.indicators.food-security`,
      defaultMessage: 'food-security',
    },
    'adult-survival': {
      id: `${scope}.indicators.adult-survival`,
      defaultMessage: 'adult-survival',
    },
    'under-5-survival': {
      id: `${scope}.indicators.under-5-survival`,
      defaultMessage: 'under-5-survival',
    },
    contraception: {
      id: `${scope}.indicators.contraception`,
      defaultMessage: 'contraception',
    },
    'birth-weight': {
      id: `${scope}.indicators.birth-weight`,
      defaultMessage: 'birth-weight',
    },
    'water-in-home': {
      id: `${scope}.indicators.water-in-home`,
      defaultMessage: 'water-in-home',
    },
    'basic-sanitation': {
      id: `${scope}.indicators.basic-sanitation`,
      defaultMessage: 'basic-sanitation',
    },
    'safe-sanitation': {
      id: `${scope}.indicators.safe-sanitation`,
      defaultMessage: 'safe-sanitation',
    },
    'relative-poverty': {
      id: `${scope}.indicators.relative-poverty`,
      defaultMessage: 'relative-poverty',
    },
    'absolute-poverty': {
      id: `${scope}.indicators.absolute-poverty`,
      defaultMessage: 'absolute-poverty',
    },
    'longterm-unemployment': {
      id: `${scope}.indicators.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment',
    },
    'affordable-housing': {
      id: `${scope}.indicators.affordable-housing`,
      defaultMessage: 'affordable-housing',
    },
    'violence-children': {
      id: `${scope}.indicators.violence-children`,
      defaultMessage: 'violence-children',
    },
    'violence-disabilities': {
      id: `${scope}.indicators.violence-disabilities`,
      defaultMessage: 'violence-disabilities',
    },
    'violence-women-and-girls': {
      id: `${scope}.indicators.violence-women-and-girls`,
      defaultMessage: 'violence-women-and-girls',
    },
    'violence-mvpfaff-lgbtqia': {
      id: `${scope}.indicators.violence-mvpfaff-lgbtqia`,
      defaultMessage: 'violence-mvpfaff-lgbtqia',
    },
    vchild: {
      id: `${scope}.indicators.vchild`,
      defaultMessage: 'vchild',
    },
    vdisab: {
      id: `${scope}.indicators.vdisab`,
      defaultMessage: 'vdisab',
    },
    vwomen: {
      id: `${scope}.indicators.vwomen`,
      defaultMessage: 'vwomen',
    },
    vmvpfaff: {
      id: `${scope}.indicators.vmvpfaff`,
      defaultMessage: 'vmvpfaff',
    },
  },
  'indicators-definition': {
    'net-primary': {
      id: `${scope}.indicators-definition.net-primary`,
      defaultMessage: 'net-primary',
    },
    'sec-enrol': {
      id: `${scope}.indicators-definition.sec-enrol`,
      defaultMessage: 'sec-enrol',
    },
    'pisa-science': {
      id: `${scope}.indicators-definition.pisa-science`,
      defaultMessage: 'pisa-science',
    },
    'pisa-math': {
      id: `${scope}.indicators-definition.pisa-math`,
      defaultMessage: 'pisa-math',
    },
    'pisa-reading': {
      id: `${scope}.indicators-definition.pisa-reading`,
      defaultMessage: 'pisa-reading',
    },
    'not-stunted': {
      id: `${scope}.indicators-definition.not-stunted`,
      defaultMessage: 'not-stunted',
    },
    'food-security': {
      id: `${scope}.indicators-definition.food-security`,
      defaultMessage: 'food-security',
    },
    'adult-survival': {
      id: `${scope}.indicators-definition.adult-survival`,
      defaultMessage: 'adult-survival',
    },
    'under-5-survival': {
      id: `${scope}.indicators-definition.under-5-survival`,
      defaultMessage: 'under-5-survival',
    },
    contraception: {
      id: `${scope}.indicators-definition.contraception`,
      defaultMessage: 'contraception',
    },
    'birth-weight': {
      id: `${scope}.indicators-definition.birth-weight`,
      defaultMessage: 'birth-weight',
    },
    'water-in-home': {
      id: `${scope}.indicators-definition.water-in-home`,
      defaultMessage: 'water-in-home',
    },
    'basic-sanitation': {
      id: `${scope}.indicators-definition.basic-sanitation`,
      defaultMessage: 'basic-sanitation',
    },
    'safe-sanitation': {
      id: `${scope}.indicators-definition.safe-sanitation`,
      defaultMessage: 'safe-sanitation',
    },
    'relative-poverty': {
      id: `${scope}.indicators-definition.relative-poverty`,
      defaultMessage: 'relative-poverty',
    },
    'absolute-poverty': {
      id: `${scope}.indicators-definition.absolute-poverty`,
      defaultMessage: 'absolute-poverty',
    },
    'longterm-unemployment': {
      id: `${scope}.indicators-definition.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment',
    },
    'affordable-housing': {
      id: `${scope}.indicators-definition.affordable-housing`,
      defaultMessage: 'affordable-housing',
    },
  },
  subrights: {
    'net-primary': {
      id: `${scope}.subrights.net-primary`,
      defaultMessage: 'net-primary',
    },
    'sec-enrol': {
      id: `${scope}.subrights.sec-enrol`,
      defaultMessage: 'sec-enrol',
    },
    'pisa-science': {
      id: `${scope}.subrights.pisa-science`,
      defaultMessage: 'pisa-science',
    },
    'pisa-math': {
      id: `${scope}.subrights.pisa-math`,
      defaultMessage: 'pisa-math',
    },
    'pisa-reading': {
      id: `${scope}.subrights.pisa-reading`,
      defaultMessage: 'pisa-reading',
    },
    'not-stunted': {
      id: `${scope}.subrights.not-stunted`,
      defaultMessage: 'not-stunted',
    },
    'food-security': {
      id: `${scope}.subrights.food-security`,
      defaultMessage: 'food-security',
    },
    'food-security-by-sex': {
      id: `${scope}.subrights.food-security-by-sex`,
      defaultMessage: 'food-security',
    },
    'adult-survival': {
      id: `${scope}.subrights.adult-survival`,
      defaultMessage: 'adult-survival',
    },
    'under-5-survival': {
      id: `${scope}.subrights.under-5-survival`,
      defaultMessage: 'under-5-survival',
    },
    contraception: {
      id: `${scope}.subrights.contraception`,
      defaultMessage: 'contraception',
    },
    'birth-weight': {
      id: `${scope}.subrights.birth-weight`,
      defaultMessage: 'birth-weight',
    },
    'water-in-home': {
      id: `${scope}.subrights.water-in-home`,
      defaultMessage: 'water-in-home',
    },
    'basic-sanitation': {
      id: `${scope}.subrights.basic-sanitation`,
      defaultMessage: 'basic-sanitation',
    },
    'safe-sanitation': {
      id: `${scope}.subrights.safe-sanitation`,
      defaultMessage: 'safe-sanitation',
    },
    'relative-poverty': {
      id: `${scope}.subrights.relative-poverty`,
      defaultMessage: 'relative-poverty',
    },
    'absolute-poverty': {
      id: `${scope}.subrights.absolute-poverty`,
      defaultMessage: 'absolute-poverty',
    },
    'longterm-unemployment': {
      id: `${scope}.subrights.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment',
    },
    'affordable-housing': {
      id: `${scope}.subrights.affordable-housing`,
      defaultMessage: 'affordable-housing',
    },
    'violence-children': {
      id: `${scope}.subrights.violence-children`,
      defaultMessage: 'violence-children',
    },
    'violence-disabilities': {
      id: `${scope}.subrights.violence-disabilities`,
      defaultMessage: 'violence-disabilities',
    },
    'violence-women-and-girls': {
      id: `${scope}.subrights.violence-women-and-girls`,
      defaultMessage: 'violence-women-and-girls',
    },
    'violence-mvpfaff-lgbtqia': {
      id: `${scope}.subrights.violence-mvpfaff-lgbtqia`,
      defaultMessage: 'violence-mvpfaff-lgbtqia',
    },
    rightTo: {
      'net-primary': {
        id: `${scope}.subrights.rightTo.net-primary`,
        defaultMessage: 'net-primary',
      },
      'sec-enrol': {
        id: `${scope}.subrights.rightTo.sec-enrol`,
        defaultMessage: 'sec-enrol',
      },
      'pisa-science': {
        id: `${scope}.subrights.rightTo.pisa-science`,
        defaultMessage: 'pisa-science',
      },
      'pisa-math': {
        id: `${scope}.subrights.rightTo.pisa-math`,
        defaultMessage: 'pisa-math',
      },
      'pisa-reading': {
        id: `${scope}.subrights.rightTo.pisa-reading`,
        defaultMessage: 'pisa-reading',
      },
      'not-stunted': {
        id: `${scope}.subrights.rightTo.not-stunted`,
        defaultMessage: 'not-stunted',
      },
      'food-security': {
        id: `${scope}.subrights.rightTo.food-security`,
        defaultMessage: 'food-security',
      },
      'adult-survival': {
        id: `${scope}.subrights.rightTo.adult-survival`,
        defaultMessage: 'adult-survival',
      },
      'under-5-survival': {
        id: `${scope}.subrights.rightTo.under-5-survival`,
        defaultMessage: 'under-5-survival',
      },
      contraception: {
        id: `${scope}.subrights.rightTo.contraception`,
        defaultMessage: 'contraception',
      },
      'birth-weight': {
        id: `${scope}.subrights.rightTo.birth-weight`,
        defaultMessage: 'birth-weight',
      },
      'water-in-home': {
        id: `${scope}.subrights.rightTo.water-in-home`,
        defaultMessage: 'water-in-home',
      },
      'basic-sanitation': {
        id: `${scope}.subrights.rightTo.basic-sanitation`,
        defaultMessage: 'basic-sanitation',
      },
      'safe-sanitation': {
        id: `${scope}.subrights.rightTo.safe-sanitation`,
        defaultMessage: 'safe-sanitation',
      },
      'relative-poverty': {
        id: `${scope}.subrights.rightTo.relative-poverty`,
        defaultMessage: 'relative-poverty',
      },
      'absolute-poverty': {
        id: `${scope}.subrights.rightTo.absolute-poverty`,
        defaultMessage: 'absolute-poverty',
      },
      'longterm-unemployment': {
        id: `${scope}.subrights.rightTo.longterm-unemployment`,
        defaultMessage: 'longterm-unemployment',
      },
      'affordable-housing': {
        id: `${scope}.subrights.rightTo.affordable-housing`,
        defaultMessage: 'affordable-housing',
      },
      'violence-children': {
        id: `${scope}.subrights.rightTo.violence-children`,
        defaultMessage: 'violence-children',
      },
      'violence-disabilities': {
        id: `${scope}.subrights.rightTo.violence-disabilities`,
        defaultMessage: 'violence-disabilities',
      },
      'violence-women-and-girls': {
        id: `${scope}.subrights.rightTo.violence-women-and-girls`,
        defaultMessage: 'violence-women-and-girls',
      },
      'violence-mvpfaff-lgbtqia': {
        id: `${scope}.subrights.rightTo.violence-mvpfaff-lgbtqia`,
        defaultMessage: 'violence-mvpfaff-lgbtqia',
      },
    },
  },
  'indicators-raw': {
    'net-primary': {
      id: `${scope}.indicators-raw.net-primary`,
      defaultMessage: 'net-primary',
    },
    'sec-enrol': {
      id: `${scope}.indicators-raw.sec-enrol`,
      defaultMessage: 'sec-enrol',
    },
    'pisa-science': {
      id: `${scope}.indicators-raw.pisa-science`,
      defaultMessage: 'pisa-science',
    },
    'pisa-math': {
      id: `${scope}.indicators-raw.pisa-math`,
      defaultMessage: 'pisa-math',
    },
    'pisa-reading': {
      id: `${scope}.indicators-raw.pisa-reading`,
      defaultMessage: 'pisa-reading',
    },
    'not-stunted': {
      id: `${scope}.indicators-raw.not-stunted`,
      defaultMessage: 'not-stunted',
    },
    'food-security': {
      id: `${scope}.indicators-raw.food-security`,
      defaultMessage: 'food-security',
    },
    'adult-survival': {
      id: `${scope}.indicators-raw.adult-survival`,
      defaultMessage: 'adult-survival',
    },
    'under-5-survival': {
      id: `${scope}.indicators-raw.under-5-survival`,
      defaultMessage: 'under-5-survival',
    },
    contraception: {
      id: `${scope}.indicators-raw.contraception`,
      defaultMessage: 'contraception',
    },
    'birth-weight': {
      id: `${scope}.indicators-raw.birth-weight`,
      defaultMessage: 'birth-weight',
    },
    'water-in-home': {
      id: `${scope}.indicators-raw.water-in-home`,
      defaultMessage: 'water-in-home',
    },
    'basic-sanitation': {
      id: `${scope}.indicators-raw.basic-sanitation`,
      defaultMessage: 'basic-sanitation',
    },
    'safe-sanitation': {
      id: `${scope}.indicators-raw.safe-sanitation`,
      defaultMessage: 'safe-sanitation',
    },
    'relative-poverty': {
      id: `${scope}.indicators-raw.relative-poverty`,
      defaultMessage: 'relative-poverty',
    },
    'absolute-poverty': {
      id: `${scope}.indicators-raw.absolute-poverty`,
      defaultMessage: 'absolute-poverty',
    },
    'longterm-unemployment': {
      id: `${scope}.indicators-raw.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment',
    },
    'affordable-housing': {
      id: `${scope}.indicators-raw.affordable-housing`,
      defaultMessage: 'affordable-housing',
    },
  },
  'indicators-about': {
    'net-primary': {
      id: `${scope}.indicators-about.net-primary`,
      defaultMessage: 'net-primary-about',
    },
    'sec-enrol': {
      id: `${scope}.indicators-about.sec-enrol`,
      defaultMessage: 'sec-enrol-about',
    },
    'pisa-science': {
      id: `${scope}.indicators-about.pisa-science`,
      defaultMessage: 'pisa-science-about',
    },
    'pisa-math': {
      id: `${scope}.indicators-about.pisa-math`,
      defaultMessage: 'pisa-math-about',
    },
    'pisa-reading': {
      id: `${scope}.indicators-about.pisa-reading`,
      defaultMessage: 'pisa-reading-about',
    },
    'not-stunted': {
      id: `${scope}.indicators-about.not-stunted`,
      defaultMessage: 'not-stunted-about',
    },
    'food-security': {
      id: `${scope}.indicators-about.food-security`,
      defaultMessage: 'food-security-about',
    },
    'adult-survival': {
      id: `${scope}.indicators-about.adult-survival`,
      defaultMessage: 'adult-survival-about',
    },
    'under-5-survival': {
      id: `${scope}.indicators-about.under-5-survival`,
      defaultMessage: 'under-5-survival-about',
    },
    contraception: {
      id: `${scope}.indicators-about.contraception`,
      defaultMessage: 'contraception-about',
    },
    'birth-weight': {
      id: `${scope}.indicators-about.birth-weight`,
      defaultMessage: 'birth-weight-about',
    },
    'water-in-home': {
      id: `${scope}.indicators-about.water-in-home`,
      defaultMessage: 'water-in-home-about',
    },
    'basic-sanitation': {
      id: `${scope}.indicators-about.basic-sanitation`,
      defaultMessage: 'basic-sanitation-about',
    },
    'safe-sanitation': {
      id: `${scope}.indicators-about.safe-sanitation`,
      defaultMessage: 'safe-sanitation-about',
    },
    'relative-poverty': {
      id: `${scope}.indicators-about.relative-poverty`,
      defaultMessage: 'relative-poverty-about',
    },
    'absolute-poverty': {
      id: `${scope}.indicators-about.absolute-poverty`,
      defaultMessage: 'absolute-poverty-about',
    },
    'longterm-unemployment': {
      id: `${scope}.indicators-about.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment-about',
    },
    'affordable-housing': {
      id: `${scope}.indicators-about.affordable-housing`,
      defaultMessage: 'affordable-housing-about',
    },
  },
  sources: {
    WB_WDI: {
      id: `${scope}.sources.WB_WDI`,
      defaultMessage: 'WB_WDI',
    },
    WHO_UNICEF_JMP: {
      id: `${scope}.sources.WHO_UNICEF_JMP`,
      defaultMessage: 'WHO_UNICEF_JMP',
    },
    LIS: {
      id: `${scope}.sources.LIS`,
      defaultMessage: 'LIS',
    },
    JME: {
      id: `${scope}.sources.JME`,
      defaultMessage: 'JME',
    },
    FAOSTAT: {
      id: `${scope}.sources.FAOSTAT`,
      defaultMessage: 'FAOSTAT',
    },
    OECD: {
      id: `${scope}.sources.OECD`,
      defaultMessage: 'OECD',
    },
    OECD_ed: {
      id: `${scope}.sources.OECD_ed`,
      defaultMessage: 'OECD_ed',
    },
    OECD_unempl: {
      id: `${scope}.sources.OECD_unempl`,
      defaultMessage: 'OECD_unempl',
    },
    OECD_housing: {
      id: `${scope}.sources.OECD_housing`,
      defaultMessage: 'OECD_housing',
    },
    UNESCO: {
      id: `${scope}.sources.UNESCO`,
      defaultMessage: 'UNESCO',
    },
    UNICEF: {
      id: `${scope}.sources.UNICEF`,
      defaultMessage: 'UNICEF',
    },
    UN_IGME: {
      id: `${scope}.sources.UN_IGME`,
      defaultMessage: 'UN_IGME',
    },
    UNDP: {
      id: `${scope}.sources.UNDP`,
      defaultMessage: 'UNDP',
    },
    UNPD: {
      id: `${scope}.sources.UNPD`,
      defaultMessage: 'United Nations Population Division',
    },
    UNPD_MPI: {
      id: `${scope}.sources.UNPD_MPI`,
      defaultMessage: 'UNPD_MPI',
    },
    WB_POVCAL: {
      id: `${scope}.sources.WB_POVCAL`,
      defaultMessage: 'WB_POVCAL',
    },
  },
  regions: {
    americas: {
      id: `${scope}.regions.americas`,
      defaultMessage: 'americas',
    },
    'east-asia-pacific': {
      id: `${scope}.regions.east-asia-pacific`,
      defaultMessage: 'east-asia-pacific',
    },
    'europe-central-asia': {
      id: `${scope}.regions.europe-central-asia`,
      defaultMessage: 'europe-central-asia',
    },
    'middle-east-north-africa': {
      id: `${scope}.regions.middle-east-north-africa`,
      defaultMessage: 'middle-east-north-africa',
    },
    'south-asia': {
      id: `${scope}.regions.south-asia`,
      defaultMessage: 'south-asia',
    },
    'sub-saharan-africa': {
      id: `${scope}.regions.sub-saharan-africa`,
      defaultMessage: 'sub-saharan-africa',
    },
  },
  subregions: {
    'east-asia': {
      id: `${scope}.subregions.east-asia`,
      defaultMessage: 'east-asia',
    },
    pacific: {
      id: `${scope}.subregions.pacific`,
      defaultMessage: 'pacific',
    },
    europe: {
      id: `${scope}.subregions.europe`,
      defaultMessage: 'europe',
    },
    'central-asia': {
      id: `${scope}.subregions.central-asia`,
      defaultMessage: 'central-asia',
    },
    'middle-east': {
      id: `${scope}.subregions.middle-east`,
      defaultMessage: 'middle-east',
    },
    'north-africa': {
      id: `${scope}.subregions.north-africa`,
      defaultMessage: 'north-africa',
    },
  },
  income: {
    hi: {
      id: `${scope}.income.hi`,
      defaultMessage: 'hi',
    },
    lmi: {
      id: `${scope}.income.lmi`,
      defaultMessage: 'lmi',
    },
  },
  countryGroups: {
    oecd: {
      id: `${scope}.countryGroups.oecd`,
      defaultMessage: 'OECD',
    },
    'not-oecd': {
      id: `${scope}.countryGroups.not-oecd`,
      defaultMessage: 'not OECD',
    },
    asean: {
      id: `${scope}.countryGroups.asean`,
      defaultMessage: 'ASEAN',
    },
    oic: {
      id: `${scope}.countryGroups.oic`,
      defaultMessage: 'OIC',
    },
  },
  treaties: {
    icescr: {
      id: `${scope}.treaties.icescr`,
      defaultMessage: 'icescr',
    },
    iccpr: {
      id: `${scope}.treaties.iccpr`,
      defaultMessage: 'iccpr',
    },
  },
  assessed: {
    cpr: {
      id: `${scope}.assessed.cpr`,
      defaultMessage: 'cpr assessed',
    },
    'not-cpr': {
      id: `${scope}.assessed.not-cpr`,
      defaultMessage: 'cpr not assessed',
    },
  },
  countries: {
    ABW: {
      id: `${scope}.countries.ABW`,
      defaultMessage: 'ABW',
    },
    ARG: {
      id: `${scope}.countries.ARG`,
      defaultMessage: 'ARG',
    },
    ATG: {
      id: `${scope}.countries.ATG`,
      defaultMessage: 'ATG',
    },
    BHS: {
      id: `${scope}.countries.BHS`,
      defaultMessage: 'BHS',
    },
    BLZ: {
      id: `${scope}.countries.BLZ`,
      defaultMessage: 'BLZ',
    },
    BMU: {
      id: `${scope}.countries.BMU`,
      defaultMessage: 'BMU',
    },
    BOL: {
      id: `${scope}.countries.BOL`,
      defaultMessage: 'BOL',
    },
    BRA: {
      id: `${scope}.countries.BRA`,
      defaultMessage: 'BRA',
    },
    BRB: {
      id: `${scope}.countries.BRB`,
      defaultMessage: 'BRB',
    },
    CAN: {
      id: `${scope}.countries.CAN`,
      defaultMessage: 'CAN',
    },
    CHL: {
      id: `${scope}.countries.CHL`,
      defaultMessage: 'CHL',
    },
    COL: {
      id: `${scope}.countries.COL`,
      defaultMessage: 'COL',
    },
    CRI: {
      id: `${scope}.countries.CRI`,
      defaultMessage: 'CRI',
    },
    CUB: {
      id: `${scope}.countries.CUB`,
      defaultMessage: 'CUB',
    },
    CUW: {
      id: `${scope}.countries.CUW`,
      defaultMessage: 'CUW',
    },
    CYM: {
      id: `${scope}.countries.CYM`,
      defaultMessage: 'CYM',
    },
    DMA: {
      id: `${scope}.countries.DMA`,
      defaultMessage: 'DMA',
    },
    DOM: {
      id: `${scope}.countries.DOM`,
      defaultMessage: 'DOM',
    },
    ECU: {
      id: `${scope}.countries.ECU`,
      defaultMessage: 'ECU',
    },
    GRD: {
      id: `${scope}.countries.GRD`,
      defaultMessage: 'GRD',
    },
    GTM: {
      id: `${scope}.countries.GTM`,
      defaultMessage: 'GTM',
    },
    GUY: {
      id: `${scope}.countries.GUY`,
      defaultMessage: 'GUY',
    },
    HND: {
      id: `${scope}.countries.HND`,
      defaultMessage: 'HND',
    },
    HTI: {
      id: `${scope}.countries.HTI`,
      defaultMessage: 'HTI',
    },
    JAM: {
      id: `${scope}.countries.JAM`,
      defaultMessage: 'JAM',
    },
    KNA: {
      id: `${scope}.countries.KNA`,
      defaultMessage: 'KNA',
    },
    LCA: {
      id: `${scope}.countries.LCA`,
      defaultMessage: 'LCA',
    },
    MAF: {
      id: `${scope}.countries.MAF`,
      defaultMessage: 'MAF',
    },
    MEX: {
      id: `${scope}.countries.MEX`,
      defaultMessage: 'MEX',
    },
    NIC: {
      id: `${scope}.countries.NIC`,
      defaultMessage: 'NIC',
    },
    PAN: {
      id: `${scope}.countries.PAN`,
      defaultMessage: 'PAN',
    },
    PER: {
      id: `${scope}.countries.PER`,
      defaultMessage: 'PER',
    },
    PRI: {
      id: `${scope}.countries.PRI`,
      defaultMessage: 'PRI',
    },
    PRY: {
      id: `${scope}.countries.PRY`,
      defaultMessage: 'PRY',
    },
    SLV: {
      id: `${scope}.countries.SLV`,
      defaultMessage: 'SLV',
    },
    SUR: {
      id: `${scope}.countries.SUR`,
      defaultMessage: 'SUR',
    },
    SXM: {
      id: `${scope}.countries.SXM`,
      defaultMessage: 'SXM',
    },
    TCA: {
      id: `${scope}.countries.TCA`,
      defaultMessage: 'TCA',
    },
    TTO: {
      id: `${scope}.countries.TTO`,
      defaultMessage: 'TTO',
    },
    URY: {
      id: `${scope}.countries.URY`,
      defaultMessage: 'URY',
    },
    USA: {
      id: `${scope}.countries.USA`,
      defaultMessage: 'USA',
    },
    VCT: {
      id: `${scope}.countries.VCT`,
      defaultMessage: 'VCT',
    },
    VEN: {
      id: `${scope}.countries.VEN`,
      defaultMessage: 'VEN',
    },
    VGB: {
      id: `${scope}.countries.VGB`,
      defaultMessage: 'VGB',
    },
    VIR: {
      id: `${scope}.countries.VIR`,
      defaultMessage: 'VIR',
    },
    TWN: {
      id: `${scope}.countries.TWN`,
      defaultMessage: 'TWN',
    },
    ASM: {
      id: `${scope}.countries.ASM`,
      defaultMessage: 'ASM',
    },
    AUS: {
      id: `${scope}.countries.AUS`,
      defaultMessage: 'AUS',
    },
    BRN: {
      id: `${scope}.countries.BRN`,
      defaultMessage: 'BRN',
    },
    CHN: {
      id: `${scope}.countries.CHN`,
      defaultMessage: 'CHN',
    },
    FJI: {
      id: `${scope}.countries.FJI`,
      defaultMessage: 'FJI',
    },
    FSM: {
      id: `${scope}.countries.FSM`,
      defaultMessage: 'FSM',
    },
    GUM: {
      id: `${scope}.countries.GUM`,
      defaultMessage: 'GUM',
    },
    HKG: {
      id: `${scope}.countries.HKG`,
      defaultMessage: 'HKG',
    },
    IDN: {
      id: `${scope}.countries.IDN`,
      defaultMessage: 'IDN',
    },
    JPN: {
      id: `${scope}.countries.JPN`,
      defaultMessage: 'JPN',
    },
    KHM: {
      id: `${scope}.countries.KHM`,
      defaultMessage: 'KHM',
    },
    KIR: {
      id: `${scope}.countries.KIR`,
      defaultMessage: 'KIR',
    },
    KOR: {
      id: `${scope}.countries.KOR`,
      defaultMessage: 'KOR',
    },
    LAO: {
      id: `${scope}.countries.LAO`,
      defaultMessage: 'LAO',
    },
    MAC: {
      id: `${scope}.countries.MAC`,
      defaultMessage: 'MAC',
    },
    MHL: {
      id: `${scope}.countries.MHL`,
      defaultMessage: 'MHL',
    },
    MMR: {
      id: `${scope}.countries.MMR`,
      defaultMessage: 'MMR',
    },
    MNG: {
      id: `${scope}.countries.MNG`,
      defaultMessage: 'MNG',
    },
    MNP: {
      id: `${scope}.countries.MNP`,
      defaultMessage: 'MNP',
    },
    MYS: {
      id: `${scope}.countries.MYS`,
      defaultMessage: 'MYS',
    },
    NCL: {
      id: `${scope}.countries.NCL`,
      defaultMessage: 'NCL',
    },
    NRU: {
      id: `${scope}.countries.NRU`,
      defaultMessage: 'NRU',
    },
    NZL: {
      id: `${scope}.countries.NZL`,
      defaultMessage: 'NZL',
    },
    PHL: {
      id: `${scope}.countries.PHL`,
      defaultMessage: 'PHL',
    },
    PLW: {
      id: `${scope}.countries.PLW`,
      defaultMessage: 'PLW',
    },
    PNG: {
      id: `${scope}.countries.PNG`,
      defaultMessage: 'PNG',
    },
    PRK: {
      id: `${scope}.countries.PRK`,
      defaultMessage: 'PRK',
    },
    PYF: {
      id: `${scope}.countries.PYF`,
      defaultMessage: 'PYF',
    },
    SGP: {
      id: `${scope}.countries.SGP`,
      defaultMessage: 'SGP',
    },
    SLB: {
      id: `${scope}.countries.SLB`,
      defaultMessage: 'SLB',
    },
    THA: {
      id: `${scope}.countries.THA`,
      defaultMessage: 'THA',
    },
    TLS: {
      id: `${scope}.countries.TLS`,
      defaultMessage: 'TLS',
    },
    TON: {
      id: `${scope}.countries.TON`,
      defaultMessage: 'TON',
    },
    TUV: {
      id: `${scope}.countries.TUV`,
      defaultMessage: 'TUV',
    },
    VNM: {
      id: `${scope}.countries.VNM`,
      defaultMessage: 'VNM',
    },
    VUT: {
      id: `${scope}.countries.VUT`,
      defaultMessage: 'VUT',
    },
    WSM: {
      id: `${scope}.countries.WSM`,
      defaultMessage: 'WSM',
    },
    ALB: {
      id: `${scope}.countries.ALB`,
      defaultMessage: 'ALB',
    },
    AND: {
      id: `${scope}.countries.AND`,
      defaultMessage: 'AND',
    },
    ARM: {
      id: `${scope}.countries.ARM`,
      defaultMessage: 'ARM',
    },
    AUT: {
      id: `${scope}.countries.AUT`,
      defaultMessage: 'AUT',
    },
    AZE: {
      id: `${scope}.countries.AZE`,
      defaultMessage: 'AZE',
    },
    BEL: {
      id: `${scope}.countries.BEL`,
      defaultMessage: 'BEL',
    },
    BGR: {
      id: `${scope}.countries.BGR`,
      defaultMessage: 'BGR',
    },
    BIH: {
      id: `${scope}.countries.BIH`,
      defaultMessage: 'BIH',
    },
    BLR: {
      id: `${scope}.countries.BLR`,
      defaultMessage: 'BLR',
    },
    CHE: {
      id: `${scope}.countries.CHE`,
      defaultMessage: 'CHE',
    },
    CHI: {
      id: `${scope}.countries.CHI`,
      defaultMessage: 'CHI',
    },
    CYP: {
      id: `${scope}.countries.CYP`,
      defaultMessage: 'CYP',
    },
    CZE: {
      id: `${scope}.countries.CZE`,
      defaultMessage: 'CZE',
    },
    DEU: {
      id: `${scope}.countries.DEU`,
      defaultMessage: 'DEU',
    },
    DNK: {
      id: `${scope}.countries.DNK`,
      defaultMessage: 'DNK',
    },
    ESP: {
      id: `${scope}.countries.ESP`,
      defaultMessage: 'ESP',
    },
    EST: {
      id: `${scope}.countries.EST`,
      defaultMessage: 'EST',
    },
    FIN: {
      id: `${scope}.countries.FIN`,
      defaultMessage: 'FIN',
    },
    FRA: {
      id: `${scope}.countries.FRA`,
      defaultMessage: 'FRA',
    },
    FRO: {
      id: `${scope}.countries.FRO`,
      defaultMessage: 'FRO',
    },
    GBR: {
      id: `${scope}.countries.GBR`,
      defaultMessage: 'GBR',
    },
    GEO: {
      id: `${scope}.countries.GEO`,
      defaultMessage: 'GEO',
    },
    GIB: {
      id: `${scope}.countries.GIB`,
      defaultMessage: 'GIB',
    },
    GRC: {
      id: `${scope}.countries.GRC`,
      defaultMessage: 'GRC',
    },
    GRL: {
      id: `${scope}.countries.GRL`,
      defaultMessage: 'GRL',
    },
    HRV: {
      id: `${scope}.countries.HRV`,
      defaultMessage: 'HRV',
    },
    HUN: {
      id: `${scope}.countries.HUN`,
      defaultMessage: 'HUN',
    },
    IMN: {
      id: `${scope}.countries.IMN`,
      defaultMessage: 'IMN',
    },
    IRL: {
      id: `${scope}.countries.IRL`,
      defaultMessage: 'IRL',
    },
    ISL: {
      id: `${scope}.countries.ISL`,
      defaultMessage: 'ISL',
    },
    ITA: {
      id: `${scope}.countries.ITA`,
      defaultMessage: 'ITA',
    },
    KAZ: {
      id: `${scope}.countries.KAZ`,
      defaultMessage: 'KAZ',
    },
    KGZ: {
      id: `${scope}.countries.KGZ`,
      defaultMessage: 'KGZ',
    },
    LIE: {
      id: `${scope}.countries.LIE`,
      defaultMessage: 'LIE',
    },
    LTU: {
      id: `${scope}.countries.LTU`,
      defaultMessage: 'LTU',
    },
    LUX: {
      id: `${scope}.countries.LUX`,
      defaultMessage: 'LUX',
    },
    LVA: {
      id: `${scope}.countries.LVA`,
      defaultMessage: '',
    },
    MCO: {
      id: `${scope}.countries.MCO`,
      defaultMessage: 'MCO',
    },
    MDA: {
      id: `${scope}.countries.MDA`,
      defaultMessage: 'MDA',
    },
    MKD: {
      id: `${scope}.countries.MKD`,
      defaultMessage: 'MKD',
    },
    MNE: {
      id: `${scope}.countries.MNE`,
      defaultMessage: 'MNE',
    },
    NLD: {
      id: `${scope}.countries.NLD`,
      defaultMessage: 'NLD',
    },
    NOR: {
      id: `${scope}.countries.NOR`,
      defaultMessage: 'NOR',
    },
    POL: {
      id: `${scope}.countries.POL`,
      defaultMessage: 'POL',
    },
    PRT: {
      id: `${scope}.countries.PRT`,
      defaultMessage: 'PRT',
    },
    ROU: {
      id: `${scope}.countries.ROU`,
      defaultMessage: 'ROU',
    },
    RUS: {
      id: `${scope}.countries.RUS`,
      defaultMessage: 'RUS',
    },
    SMR: {
      id: `${scope}.countries.SMR`,
      defaultMessage: 'SMR',
    },
    SRB: {
      id: `${scope}.countries.SRB`,
      defaultMessage: 'SRB',
    },
    SVK: {
      id: `${scope}.countries.SVK`,
      defaultMessage: 'SVK',
    },
    SVN: {
      id: `${scope}.countries.SVN`,
      defaultMessage: 'SVN',
    },
    SWE: {
      id: `${scope}.countries.SWE`,
      defaultMessage: 'SWE',
    },
    TJK: {
      id: `${scope}.countries.TJK`,
      defaultMessage: 'TJK',
    },
    TKM: {
      id: `${scope}.countries.TKM`,
      defaultMessage: 'TKM',
    },
    TUR: {
      id: `${scope}.countries.TUR`,
      defaultMessage: 'TUR',
    },
    UKR: {
      id: `${scope}.countries.UKR`,
      defaultMessage: 'UKR',
    },
    UZB: {
      id: `${scope}.countries.UZB`,
      defaultMessage: 'UZB',
    },
    XKX: {
      id: `${scope}.countries.XKX`,
      defaultMessage: 'XKX',
    },
    ARE: {
      id: `${scope}.countries.ARE`,
      defaultMessage: 'ARE',
    },
    BHR: {
      id: `${scope}.countries.BHR`,
      defaultMessage: 'BHR',
    },
    DJI: {
      id: `${scope}.countries.DJI`,
      defaultMessage: 'DJI',
    },
    DZA: {
      id: `${scope}.countries.DZA`,
      defaultMessage: 'DZA',
    },
    EGY: {
      id: `${scope}.countries.EGY`,
      defaultMessage: 'EGY',
    },
    IRN: {
      id: `${scope}.countries.IRN`,
      defaultMessage: 'IRN',
    },
    IRQ: {
      id: `${scope}.countries.IRQ`,
      defaultMessage: 'IRQ',
    },
    ISR: {
      id: `${scope}.countries.ISR`,
      defaultMessage: 'ISR',
    },
    JOR: {
      id: `${scope}.countries.JOR`,
      defaultMessage: 'JOR',
    },
    KWT: {
      id: `${scope}.countries.KWT`,
      defaultMessage: 'KWT',
    },
    LBN: {
      id: `${scope}.countries.LBN`,
      defaultMessage: 'LBN',
    },
    LBY: {
      id: `${scope}.countries.LBY`,
      defaultMessage: 'LBY',
    },
    MAR: {
      id: `${scope}.countries.MAR`,
      defaultMessage: 'MAR',
    },
    MLT: {
      id: `${scope}.countries.MLT`,
      defaultMessage: 'MLT',
    },
    OMN: {
      id: `${scope}.countries.OMN`,
      defaultMessage: 'OMN',
    },
    PSE: {
      id: `${scope}.countries.PSE`,
      defaultMessage: 'PSE',
    },
    QAT: {
      id: `${scope}.countries.QAT`,
      defaultMessage: 'QAT',
    },
    SAU: {
      id: `${scope}.countries.SAU`,
      defaultMessage: 'SAU',
    },
    SYR: {
      id: `${scope}.countries.SYR`,
      defaultMessage: 'SYR',
    },
    TUN: {
      id: `${scope}.countries.TUN`,
      defaultMessage: 'TUN',
    },
    YEM: {
      id: `${scope}.countries.YEM`,
      defaultMessage: 'YEM',
    },
    AFG: {
      id: `${scope}.countries.AFG`,
      defaultMessage: 'AFG',
    },
    BGD: {
      id: `${scope}.countries.BGD`,
      defaultMessage: 'BGD',
    },
    BTN: {
      id: `${scope}.countries.BTN`,
      defaultMessage: 'BTN',
    },
    IND: {
      id: `${scope}.countries.IND`,
      defaultMessage: 'IND',
    },
    LKA: {
      id: `${scope}.countries.LKA`,
      defaultMessage: 'LKA',
    },
    MDV: {
      id: `${scope}.countries.MDV`,
      defaultMessage: 'MDV',
    },
    NPL: {
      id: `${scope}.countries.NPL`,
      defaultMessage: 'NPL',
    },
    PAK: {
      id: `${scope}.countries.PAK`,
      defaultMessage: 'PAK',
    },
    AGO: {
      id: `${scope}.countries.AGO`,
      defaultMessage: 'AGO',
    },
    BDI: {
      id: `${scope}.countries.BDI`,
      defaultMessage: 'BDI',
    },
    BEN: {
      id: `${scope}.countries.BEN`,
      defaultMessage: 'BEN',
    },
    BFA: {
      id: `${scope}.countries.BFA`,
      defaultMessage: 'BFA',
    },
    BWA: {
      id: `${scope}.countries.BWA`,
      defaultMessage: 'BWA',
    },
    CAF: {
      id: `${scope}.countries.CAF`,
      defaultMessage: 'CAF',
    },
    CIV: {
      id: `${scope}.countries.CIV`,
      defaultMessage: 'CIV',
    },
    CMR: {
      id: `${scope}.countries.CMR`,
      defaultMessage: 'CMR',
    },
    COD: {
      id: `${scope}.countries.COD`,
      defaultMessage: 'COD',
    },
    COG: {
      id: `${scope}.countries.COG`,
      defaultMessage: 'COG',
    },
    COM: {
      id: `${scope}.countries.COM`,
      defaultMessage: 'COM',
    },
    CPV: {
      id: `${scope}.countries.CPV`,
      defaultMessage: 'CPV',
    },
    ERI: {
      id: `${scope}.countries.ERI`,
      defaultMessage: 'ERI',
    },
    ETH: {
      id: `${scope}.countries.ETH`,
      defaultMessage: 'ETH',
    },
    GAB: {
      id: `${scope}.countries.GAB`,
      defaultMessage: 'GAB',
    },
    GHA: {
      id: `${scope}.countries.GHA`,
      defaultMessage: 'GHA',
    },
    GIN: {
      id: `${scope}.countries.GIN`,
      defaultMessage: 'GIN',
    },
    GMB: {
      id: `${scope}.countries.GMB`,
      defaultMessage: 'GMB',
    },
    GNB: {
      id: `${scope}.countries.GNB`,
      defaultMessage: 'GNB',
    },
    GNQ: {
      id: `${scope}.countries.GNQ`,
      defaultMessage: 'GNQ',
    },
    KEN: {
      id: `${scope}.countries.KEN`,
      defaultMessage: 'KEN',
    },
    LBR: {
      id: `${scope}.countries.LBR`,
      defaultMessage: 'LBR',
    },
    LSO: {
      id: `${scope}.countries.LSO`,
      defaultMessage: 'LSO',
    },
    MDG: {
      id: `${scope}.countries.MDG`,
      defaultMessage: 'MDG',
    },
    MLI: {
      id: `${scope}.countries.MLI`,
      defaultMessage: 'MLI',
    },
    MOZ: {
      id: `${scope}.countries.MOZ`,
      defaultMessage: 'MOZ',
    },
    MRT: {
      id: `${scope}.countries.MRT`,
      defaultMessage: 'MRT',
    },
    MUS: {
      id: `${scope}.countries.MUS`,
      defaultMessage: 'MUS',
    },
    MWI: {
      id: `${scope}.countries.MWI`,
      defaultMessage: 'MWI',
    },
    NAM: {
      id: `${scope}.countries.NAM`,
      defaultMessage: 'NAM',
    },
    NER: {
      id: `${scope}.countries.NER`,
      defaultMessage: 'NER',
    },
    NGA: {
      id: `${scope}.countries.NGA`,
      defaultMessage: 'NGA',
    },
    RWA: {
      id: `${scope}.countries.RWA`,
      defaultMessage: 'RWA',
    },
    SDN: {
      id: `${scope}.countries.SDN`,
      defaultMessage: 'SDN',
    },
    SEN: {
      id: `${scope}.countries.SEN`,
      defaultMessage: 'SEN',
    },
    SLE: {
      id: `${scope}.countries.SLE`,
      defaultMessage: 'SLE',
    },
    SOM: {
      id: `${scope}.countries.SOM`,
      defaultMessage: 'SOM',
    },
    SSD: {
      id: `${scope}.countries.SSD`,
      defaultMessage: 'SSD',
    },
    STP: {
      id: `${scope}.countries.STP`,
      defaultMessage: 'STP',
    },
    SWZ: {
      id: `${scope}.countries.SWZ`,
      defaultMessage: 'SWZ',
    },
    SYC: {
      id: `${scope}.countries.SYC`,
      defaultMessage: 'SYC',
    },
    TCD: {
      id: `${scope}.countries.TCD`,
      defaultMessage: 'TCD',
    },
    TGO: {
      id: `${scope}.countries.TGO`,
      defaultMessage: 'TGO',
    },
    TZA: {
      id: `${scope}.countries.TZA`,
      defaultMessage: 'TZA',
    },
    UGA: {
      id: `${scope}.countries.UGA`,
      defaultMessage: 'UGA',
    },
    ZAF: {
      id: `${scope}.countries.ZAF`,
      defaultMessage: 'ZAF',
    },
    ZMB: {
      id: `${scope}.countries.ZMB`,
      defaultMessage: 'ZMB',
    },
    ZWE: {
      id: `${scope}.countries.ZWE`,
      defaultMessage: 'ZWE',
    },
    COK: {
      id: `${scope}.countries.COK`,
      defaultMessage: 'COK',
    },
    NIU: {
      id: `${scope}.countries.NIU`,
      defaultMessage: 'NIU',
    },
    TKL: {
      id: `${scope}.countries.TKL`,
      defaultMessage: 'TKL',
    },
    WLF: {
      id: `${scope}.countries.WLF`,
      defaultMessage: 'WLF',
    },
  },
  featured: {
    A: {
      id: `${scope}.featured.A`,
      defaultMessage: 'In the news',
    },
    B: {
      id: `${scope}.featured.B`,
      defaultMessage: 'UPR upcoming',
    },
    C: {
      id: `${scope}.featured.C`,
      defaultMessage: 'Featured C',
    },
    D: {
      id: `${scope}.featured.D`,
      defaultMessage: 'Featured D',
    },
    E: {
      id: `${scope}.featured.E`,
      defaultMessage: 'Featured E',
    },
    F: {
      id: `${scope}.featured.F`,
      defaultMessage: 'Featured F',
    },
    any: {
      id: `${scope}.featured.any`,
      defaultMessage: 'Featured',
    },
  },
  status: {
    unincorporated: {
      id: `${scope}.status.unincorporated`,
      defaultMessage: 'Unincorporated territory',
    },
    associated: {
      id: `${scope}.status.associated`,
      defaultMessage: 'Associated state',
    },
    collectivity_overseas: {
      id: `${scope}.status.collectivity_overseas`,
      defaultMessage: 'Overseas collectivity',
    },
    collectivity_special: {
      id: `${scope}.status.collectivity_special`,
      defaultMessage: 'Special collectivity',
    },
    selfgoverning: {
      id: `${scope}.status.selfgoverning`,
      defaultMessage: 'Self-governing in free association',
    },
    nonselfgoverning: {
      id: `${scope}.status.nonselfgoverning`,
      defaultMessage: 'Non-self-governing territory',
    },
    commonwealth_politicalunion: {
      id: `${scope}.status.commonwealth_politicalunion`,
      defaultMessage: 'Commonwealth in political union',
    },
  },
  pdf: {
    subtitle: {
      id: `${scope}.pdf.subtitle`,
      defaultMessage: 'Country Profiles | Human Rights in',
    },
    noData: {
      id: `${scope}.pdf.noData`,
      defaultMessage: 'This category includes the following rights:',
    },
    explore: {
      id: `${scope}.pdf.explore`,
      defaultMessage:
        "To explore this country's scores in more detail please go to rightstracker.org",
    },
  },
  pacific: {
    intro: {
      id: `${scope}.pacific.intro`,
      defaultMessage:
        'On this tab you can find data collected only in Pacific countries, on five themes.',
    },
    vchild: {
      id: `${scope}.pacific.vchild`,
      defaultMessage: 'Children',
    },
    vwomen: {
      id: `${scope}.pacific.vwomen`,
      defaultMessage: 'Women and Girls',
    },
    vmvpfaff: {
      id: `${scope}.pacific.vmvpfaff`,
      defaultMessage: 'MVPFAFF+/LGBTQIA+',
    },
    vdisab: {
      id: `${scope}.pacific.vdisab`,
      defaultMessage: 'People with disabilities',
    },
    'violence-against': {
      id: `${scope}.pacific.violence-against`,
      defaultMessage: 'Violence against',
    },
    violence: {
      id: `${scope}.pacific.violence`,
      defaultMessage: 'Violence',
    },
    'violence-subheading': {
      id: `${scope}.pacific.violence-subheading`,
      defaultMessage:
        'To what extent are people in {countryWithArticle} free from violence in the community?',
    },
    'climate-crisis': {
      id: `${scope}.pacific.climate-crisis`,
      defaultMessage: 'Climate crisis',
    },
    'climate-crisis-subheading': {
      id: `${scope}.pacific.climate-crisis-subheading`,
      defaultMessage:
        'How much has climate crisis worsened human rights conditions in {countryWithArticle}?',
    },
    'indigenous-sovereignty': {
      id: `${scope}.pacific.indigenous-sovereignty`,
      defaultMessage: 'Indigenous sovereignty',
    },
    'indigenous-sovereignty-subheading': {
      id: `${scope}.pacific.indigenous-sovereignty-subheading`,
      defaultMessage:
        'To what extent are Indigenous and/or native communities in {countryWithArticle} able to exercise self-determination?',
    },
    'indigenous-lands': {
      id: `${scope}.pacific.indigenous-lands`,
      defaultMessage: 'Indigenous lands',
    },
    'indigenous-lands-subheading': {
      id: `${scope}.pacific.indigenous-lands-subheading`,
      defaultMessage:
        'To what extent do Indigenous and/or native communities in {countryWithArticle} have possession and enjoyment of their traditional lands?',
    },
    'cultural-rights': {
      id: `${scope}.pacific.cultural-rights`,
      defaultMessage: 'Cultural rights',
    },
    'cultural-rights-subheading': {
      id: `${scope}.pacific.cultural-rights-subheading`,
      defaultMessage:
        'To what extent do people in {countryWithArticle} enjoy their cultural rights?',
    },
    'violence-children': {
      id: `${scope}.pacific.violence-children`,
      defaultMessage: 'Violence against children',
    },
    'violence-women': {
      id: `${scope}.pacific.violence-women`,
      defaultMessage: 'Violence against women and girls',
    },
    'violence-mvpfaff': {
      id: `${scope}.pacific.violence-mvpfaff`,
      defaultMessage: 'Violence against MVPFAFF+/LGBTQIA+',
    },
    'violence-disabled': {
      id: `${scope}.pacific.violence-disabled`,
      defaultMessage: 'Violence against people with disabilities',
    },
    'not-at-all': {
      id: `${scope}.pacific.not-at-all`,
      defaultMessage: 'Not at All',
    },
    slightly: {
      id: `${scope}.pacific.slightly`,
      defaultMessage: 'Slightly',
    },
    somewhat: {
      id: `${scope}.pacific.somewhat`,
      defaultMessage: 'Somewhat',
    },
    moderately: {
      id: `${scope}.pacific.moderately`,
      defaultMessage: 'Moderately',
    },
    greatly: {
      id: `${scope}.pacific.greatly`,
      defaultMessage: 'Greatly',
    },
    extremely: {
      id: `${scope}.pacific.extremely`,
      defaultMessage: 'Extremely',
    },
    highly: {
      id: `${scope}.pacific.highly`,
      defaultMessage: 'Highly',
    },
    completely: {
      id: `${scope}.pacific.completely`,
      defaultMessage: 'Completely',
    },
    jump: {
      id: `${scope}.pacific.jump`,
      defaultMessage: 'Jump to:',
    },
    lessSafe: {
      id: `${scope}.pacific.lessSafe`,
      defaultMessage: 'Less safe',
    },
    moreSafe: {
      id: `${scope}.pacific.moreSafe`,
      defaultMessage: 'More safe',
    },
    explanation: {
      id: `${scope}.pacific.explanation`,
      defaultMessage:
        'When asked this question, our {no} respondents in {countryWithArticle} gave an average answer of {score}, suggesting that {issue} has affected human rights conditions between {lowerBandLabel} and {upperBandLabel}.',
    },
    htr: {
      id: `${scope}.pacific.htr`,
      defaultMessage:
        'Each country score has been produced from responses to a detailed survey of human rights experts who either live in or specialise in monitoring that country. Scores closer to 10 are better.',
    },
  },
  BehindTheNumbers: {
    header: {
      id: `${scope}.BehindTheNumbers.header`,
      defaultMessage: 'Behind the numbers',
    },
  },
});
