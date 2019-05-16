/*
 * Global Messages
 *
 * This contains all the text for the Country container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi';

export default defineMessages({
  tabs: {
    countries: {
      id: `${scope}.tabs.countries`,
      defaultMessage: 'Explore by country',
    },
    metrics: {
      id: `${scope}.tabs.metrics`,
      defaultMessage: 'Explore by metric',
    },
    report: {
      id: `${scope}.tabs.report`,
      defaultMessage: 'Report',
    },
    singleMetric: {
      id: `${scope}.tabs.singleMetric`,
      defaultMessage: 'Explore metric',
    },
    'people-at-risk': {
      id: `${scope}.tabs['people-at-risk']`,
      defaultMessage: 'People at risk',
    },
    about: {
      id: `${scope}.tabs.about`,
      defaultMessage: 'About',
    },
  },
  charts: {
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
  },
  settings: {
    scale: {
      name: {
        id: `${scope}.settings.scale.name`,
        defaultMessage: 'Metric scale',
      },
      dimensions: {
        id: `${scope}.settings.scale.dimensions`,
        defaultMessage: 'Categories',
      },
      rights: {
        id: `${scope}.settings.scale.rights`,
        defaultMessage: 'Rights',
      },
    },
    standard: {
      name: {
        id: `${scope}.settings.standard.name`,
        defaultMessage: 'Assessment standard',
      },
      core: {
        id: `${scope}.settings.standard.core`,
        defaultMessage: 'Low and middle income',
      },
      hi: {
        id: `${scope}.settings.standard.hi`,
        defaultMessage: 'High income',
      },
    },
    benchmark: {
      name: {
        id: `${scope}.settings.benchmark.name`,
        defaultMessage: 'Performance benchmark',
      },
      adjusted: {
        id: `${scope}.settings.benchmark.adjusted`,
        defaultMessage: 'Income-adjusted',
      },
      best: {
        id: `${scope}.settings.benchmark.best`,
        defaultMessage: 'Global best',
      },
    },
  },
  'metric-types': {
    dimensions: {
      id: `${scope}.metric-types.dimensions`,
      defaultMessage: 'Categories of Rights',
    },
    'dimensions-short': {
      id: `${scope}.metric-types.dimensions-short`,
      defaultMessage: 'Categories',
    },
    rights: {
      id: `${scope}.metric-types.rights`,
      defaultMessage: 'Rights',
    },
    indicators: {
      id: `${scope}.metric-types.indicators`,
      defaultMessage: 'Indicators',
    },
    dimension: {
      id: `${scope}.metric-types.dimension`,
      defaultMessage: 'Category of Rights',
    },
    'dimension-short': {
      id: `${scope}.metric-types.dimensions-short`,
      defaultMessage: 'Category',
    },
    right: {
      id: `${scope}.metric-types.right`,
      defaultMessage: 'Right',
    },
    indicator: {
      id: `${scope}.metric-types.indicator`,
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
    execution: {
      id: `${scope}.rights.execution`,
      defaultMessage: 'execution',
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
    execution: {
      id: `${scope}.rights-short.execution`,
      defaultMessage: 'execution',
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
      id: `${scope}.rights.participation`,
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
    'survival-65': {
      id: `${scope}.indicators.survival-65`,
      defaultMessage: 'survival-65',
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
    'survival-65': {
      id: `${scope}.indicators-raw.survival-65`,
      defaultMessage: 'survival-65',
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
  oecd: {
    0: {
      id: `${scope}.oecd.0`,
      defaultMessage: 'not oecd',
    },
    1: {
      id: `${scope}.oecd.1`,
      defaultMessage: 'oecd',
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
      id: `${scope}.countries.WSM`,
      defaultMessage: 'WSM',
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
      defaultMessage: '',
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
      id: `${scope}.countries.MNE`,
      defaultMessage: 'MNE',
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
      defaultMessage: '',
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
      id: `${scope}.countries.IRN`,
      defaultMessage: 'IRN',
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
      id: `${scope}.countries.COM`,
      defaultMessage: 'COM',
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
  },
});
