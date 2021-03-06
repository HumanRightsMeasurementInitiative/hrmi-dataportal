/*
 * HowToRead Messages
 *
 * This contains all the text for the HowToRead component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.LayerHowToRead';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'How to read this chart',
  },
  labelWithName: {
    id: `${scope}.labelWithName`,
    defaultMessage: 'How to read the {name} chart',
  },
  labelMobile: {
    id: `${scope}.labelMobile`,
    defaultMessage: 'How to read',
  },
  general: {
    benchmarkIntro: {
      id: `${scope}.general.benchmarkIntro`,
      defaultMessage:
        'The maximum value of 100% refers to the chosen {benchmark}',
    },
  },
  overview: {
    dimensions: {
      intro: {
        id: `${scope}.overview.dimensions.intro`,
        defaultMessage:
          "Each chart shows the Human Rights Performance of each country at a glance. Countries' scores are visualised for our 3 categories of Human Rights:",
      },
      empowerment: {
        id: `${scope}.overview.dimensions.empowerment`,
        defaultMessage:
          'Summary score for 3 Civil and Political Rights, mapped on a scale from 0 to 10.',
      },
      physint: {
        id: `${scope}.overview.dimensions.physint`,
        defaultMessage:
          "Summary score for 4 Civil and Political Rights that foster citizens' physical integrity, mapped on a scale from 0 to 10.",
      },
      esr: {
        id: `${scope}.overview.dimensions.esr`,
        defaultMessage:
          'Summary percentage score for our 5 Economic and Social Rights, ranging from 0 to 100%.',
      },
    },
    rights: {
      intro: {
        id: `${scope}.overview.rights.intro`,
        defaultMessage:
          "Each chart shows the Human Rights Performance of each country at a glance. Countries' scores are visualised for our 12 Human Rights, grouped and colour-coded in our 3 categories of rights:",
      },
      rightsListTitle: {
        id: `${scope}.overview.rights.rightsListTitle`,
        defaultMessage: 'Rights from top to bottom',
      },
      empowerment: {
        id: `${scope}.overview.rights.empowerment`,
        defaultMessage:
          '3 Civil and Political Rights that strengthen democratic empowerment, scores mapped on a scale from 0 to 10',
      },
      physint: {
        id: `${scope}.overview.rights.physint`,
        defaultMessage:
          "Score for 4 Civil and Political Rights that foster citizens' physical integrity, mapped on a scale from 0 to 10",
      },
      esr: {
        id: `${scope}.overview.rights.esr`,
        defaultMessage:
          'Percentage score for our 5 Economic and Social Rights, ranging from 0 to 100%.',
      },
    },
  },
  summary: {
    dimensions: {
      intro: {
        id: `${scope}.summary.dimensions.intro`,
        defaultMessage:
          "Countries' scores are visualised for our 3 categories of Human Rights:",
      },
      empowerment: {
        id: `${scope}.summary.dimensions.empowerment`,
        defaultMessage:
          'Summary score for 3 Civil and Political Rights, mapped on a scale from 0 to 10.',
      },
      physint: {
        id: `${scope}.summary.dimensions.physint`,
        defaultMessage:
          "Summary score for 4 Civil and Political Rights that foster citizens' physical integrity, mapped on a scale from 0 to 10.",
      },
      esr: {
        id: `${scope}.summary.dimensions.esr`,
        defaultMessage:
          'Summary percentage score for our 5 Economic and Social Rights, ranging from 0 to 100%.',
      },
    },
    rights: {
      intro: {
        id: `${scope}.summary.rights.intro`,
        defaultMessage:
          "Countries' scores are visualised for our 12 Human Rights, grouped and colour-coded in our 3 categories of rights:",
      },
      rightsListTitle: {
        id: `${scope}.summary.rights.rightsListTitle`,
        defaultMessage: 'Rights from top to bottom',
      },
      empowerment: {
        id: `${scope}.summary.rights.empowerment`,
        defaultMessage:
          '3 Civil and Political Rights that strengthen democratic empowerment, scores mapped on a scale from 0 to 10',
      },
      physint: {
        id: `${scope}.summary.rights.physint`,
        defaultMessage:
          "Score for 4 Civil and Political Rights that foster citizens' physical integrity, mapped on a scale from 0 to 10",
      },
      esr: {
        id: `${scope}.summary.rights.esr`,
        defaultMessage:
          'Percentage score for our 5 Economic and Social Rights, ranging from 0 to 100%.',
      },
    },
  },
  trendCPR: {
    intro: {
      id: `${scope}.trendCPR.intro`,
      defaultMessage:
        'Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. How the expert options changed over time can be seen in the time charts.',
    },
    rangeTitle: {
      id: `${scope}.trendCPR.rangeTitle`,
      defaultMessage: 'How to interpet the uncertainty bands',
    },
    largeRange: {
      id: `${scope}.trendCPR.largeRange`,
      defaultMessage:
        'A large range indicate more uncertainty about what the true score is because the experts scored the country for a right very differently. ',
    },
    smallRange: {
      id: `${scope}.trendCPR.smallRange`,
      defaultMessage:
        'A small range indicate less uncertainty since most experts scored the country similar. ',
    },
  },
  trendESR: {
    intro: {
      id: `${scope}.trendESR.intro`,
      defaultMessage:
        'Economic and social right scores range from 0 to 100% and are based on underlying indicators. The better the score the longer the bar.',
    },
  },
  simpleBar: {
    intro: {
      id: `${scope}.simpleBar.intro`,
      defaultMessage:
        'Economic and social right scores range from 0 to 100% and are based on underlying indicators. The better the score the longer the bar.',
    },
    countryComparison: {
      id: `${scope}.simpleBar.countryComparison`,
      defaultMessage:
        "Higher scores indicate greater fulfilment of a country's obligations for this human right.",
    },
    drilldownHint: {
      id: `${scope}.bullet.drilldownHint`,
      defaultMessage:
        'To explore the individual rights and underlying indicators in more detail, click on the down arrow.',
    },
  },
  bullet: {
    intro: {
      id: `${scope}.bullet.intro`,
      defaultMessage:
        'Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. The better the score, the further it is mapped to the right.',
    },
    drilldownHint: {
      id: `${scope}.bullet.drilldownHint`,
      defaultMessage:
        'To explore the individual rights in more detail, click on the down arrow.',
    },
    rangeTitle: {
      id: `${scope}.bullet.rangeTitle`,
      defaultMessage: 'How to interpet the scores and uncertainty bands',
    },
    scores: {
      id: `${scope}.bullet.scores`,
      defaultMessage:
        'While the average score is represented by the thick line in the middle, the coloured bar represents the uncertainty about the true score, and ranges from the 10<sup>th</sup> percentile on the lower (left) end to the 90<sup>th</sup> percentile on the higher (right) end. ',
    },
    scoreAverage: {
      id: `${scope}.bullet.scoreAverage`,
      defaultMessage: 'Average score ',
    },
    score10: {
      id: `${scope}.bullet.score10`,
      defaultMessage: '10th percentile ',
    },
    score90: {
      id: `${scope}.bullet.score90`,
      defaultMessage: '90th percentile ',
    },
    longBars: {
      id: `${scope}.bullet.longBars`,
      defaultMessage:
        'Long bars indicate more uncertainty about what the true score is because the experts scored the country for a right very differently. ',
    },
    shortBars: {
      id: `${scope}.bullet.shortBars`,
      defaultMessage:
        'Short bars indicate less uncertainty since most experts scored the country similar. ',
    },
    countryComparison: {
      id: `${scope}.bullet.countryComparison`,
      defaultMessage:
        'The smaller the overlap the more likely it is that the scores are different ',
    },
  },
});
