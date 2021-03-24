/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathMetric';

export default defineMessages({
  dimensions: {
    esr: {
      header: {
        a: {
          id: `${scope}.dimensions.esr.header.a`,
          defaultMessage: 'Are people’s economic and social rights being met?',
        },
        b: {
          id: `${scope}.dimensions.esr.header.b`,
          defaultMessage:
            'These scores measure how well a country is using its resources to ensure people’s economic and social rights are fulfilled.',
        },
      },
      link: {
        id: `${scope}.dimensions.esr.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    physint: {
      header: {
        a: {
          id: `${scope}.dimensions.physint.header.a`,
          defaultMessage: 'Are people safe from harmful state actions?',
        },
        b: {
          id: `${scope}.dimensions.physint.header.b`,
          defaultMessage:
            'The estimated score is displayed within an uncertainty band.',
        },
      },
      link: {
        id: `${scope}.dimensions.physint.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    empowerment: {
      header: {
        a: {
          id: `${scope}.dimensions.empowerment.header.a`,
          defaultMessage:
            'Are people empowered to fully participate in society?',
        },
        b: {
          id: `${scope}.dimensions.empowerment.header.b`,
          defaultMessage:
            'The estimated score is displayed within an uncertainty band.',
        },
      },
      link: {
        id: `${scope}.dimensions.empowerment.link`,
        defaultMessage: 'More about the methodology',
      },
    },
  },
  rights: {
    food: {
      header: {
        a: {
          id: `${scope}.rights.food.header.a`,
          defaultMessage: 'rights.food.header.a',
        },
        b: {
          id: `${scope}.rights.food.header.b`,
          defaultMessage: 'rights.food.header.b',
        },
      },
      link: {
        id: `${scope}.rights.food.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    education: {
      header: {
        a: {
          id: `${scope}.rights.education.header.a`,
          defaultMessage: 'rights.education.header.a',
        },
        b: {
          id: `${scope}.rights.education.header.b`,
          defaultMessage: 'rights.education.header.b',
        },
      },
      link: {
        id: `${scope}.rights.education.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    health: {
      header: {
        a: {
          id: `${scope}.rights.health.header.a`,
          defaultMessage: 'rights.health.header.a',
        },
        b: {
          id: `${scope}.rights.health.header.b`,
          defaultMessage: 'rights.health.header.b',
        },
      },
      link: {
        id: `${scope}.rights.health.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    housing: {
      header: {
        a: {
          id: `${scope}.rights.housing.header.a`,
          defaultMessage: 'rights.housing.header.a',
        },
        b: {
          id: `${scope}.rights.housing.header.b`,
          defaultMessage: 'rights.housing.header.b',
        },
      },
      link: {
        id: `${scope}.rights.housing.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    work: {
      header: {
        a: {
          id: `${scope}.rights.work.header.a`,
          defaultMessage: 'rights.work.header.a',
        },
        b: {
          id: `${scope}.rights.work.header.b`,
          defaultMessage: 'rights.work.header.b',
        },
      },
      link: {
        id: `${scope}.rights.work.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    arrest: {
      header: {
        a: {
          id: `${scope}.rights.arrest.header.a`,
          defaultMessage: 'rights.arrest.header.a',
        },
        b: {
          id: `${scope}.rights.arrest.header.b`,
          defaultMessage: 'rights.arrest.header.b',
        },
      },
      link: {
        id: `${scope}.rights.arrest.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    disappearance: {
      header: {
        a: {
          id: `${scope}.rights.disappearance.header.a`,
          defaultMessage: 'rights.disappearance.header.a',
        },
        b: {
          id: `${scope}.rights.disappearance.header.b`,
          defaultMessage: 'rights.disappearance.header.b',
        },
      },
      link: {
        id: `${scope}.rights.disappearance.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    'death-penalty': {
      header: {
        a: {
          id: `${scope}.rights.death-penalty.header.a`,
          defaultMessage: 'rights.death-penalty.header.a',
        },
        b: {
          id: `${scope}.rights.death-penalty.header.b`,
          defaultMessage: 'rights.death-penalty.header.b',
        },
      },
      link: {
        id: `${scope}.rights.death-penalty.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    'extrajud-killing': {
      header: {
        a: {
          id: `${scope}.rights.extrajud-killing.header.a`,
          defaultMessage: 'rights.extrajud-killing.header.a',
        },
        b: {
          id: `${scope}.rights.extrajud-killing.header.b`,
          defaultMessage: 'rights.extrajud-killing.header.b',
        },
      },
      link: {
        id: `${scope}.rights.extrajud-killing.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    torture: {
      header: {
        a: {
          id: `${scope}.rights.torture.header.a`,
          defaultMessage: 'rights.torture.header.a',
        },
        b: {
          id: `${scope}.rights.torture.header.b`,
          defaultMessage: 'rights.torture.header.b',
        },
      },
      link: {
        id: `${scope}.rights.torture.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    assembly: {
      header: {
        a: {
          id: `${scope}.rights.assembly.header.a`,
          defaultMessage: 'rights.assembly.header.a',
        },
        b: {
          id: `${scope}.rights.assembly.header.b`,
          defaultMessage: 'rights.assembly.header.b',
        },
      },
      link: {
        id: `${scope}.rights.assembly.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    expression: {
      header: {
        a: {
          id: `${scope}.rights.expression.header.a`,
          defaultMessage: 'rights.expression.header.a',
        },
        b: {
          id: `${scope}.rights.expression.header.b`,
          defaultMessage: 'rights.expression.header.b',
        },
      },
      link: {
        id: `${scope}.rights.expression.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    participation: {
      header: {
        a: {
          id: `${scope}.rights.participation.header.a`,
          defaultMessage: 'rights.participation.header.a',
        },
        b: {
          id: `${scope}.rights.participation.header.b`,
          defaultMessage: 'rights.participation.header.b',
        },
      },
      link: {
        id: `${scope}.rights.participation.link`,
        defaultMessage: 'More about the methodology',
      },
    },
    tooltip: {
      id: `${scope}.rights.tooltip`,
      defaultMessage:
        'This question shows what HRMI is measuring. [NP] For each economic and social right, HRMI selects a small number of high-level ‘bellwether’ indicators to give an overview of how well countries are doing. These indicators may not capture every aspect of the right as defined in international law.',
    },
  },
  indicators: {
    'net-primary': {
      header: {
        a: {
          id: `${scope}.indicators.net-primary.header.a`,
          defaultMessage: 'indicators.net-primary.header.a',
        },
        b: {
          id: `${scope}.indicators.net-primary.header.b`,
          defaultMessage: 'indicators.net-primary.header.b',
        },
      },
    },
    'sec-enrol': {
      header: {
        a: {
          id: `${scope}.indicators.sec-enrol.header.a`,
          defaultMessage: 'indicators.sec-enrol.header.a',
        },
        b: {
          id: `${scope}.indicators.net-primary.header.b`,
          defaultMessage: 'indicators.sec-enrol.header.b',
        },
      },
    },
    'pisa-science': {
      header: {
        a: {
          id: `${scope}.indicators.pisa-science.header.a`,
          defaultMessage: 'indicators.pisa-science.header.a',
        },
        b: {
          id: `${scope}.indicators.net-primary.header.b`,
          defaultMessage: 'indicators.pisa-science.header.b',
        },
      },
    },
    'pisa-math': {
      header: {
        a: {
          id: `${scope}.indicators.pisa-math.header.a`,
          defaultMessage: 'indicators.pisa-math.header.a',
        },
        b: {
          id: `${scope}.indicators.pisa-math.header.b`,
          defaultMessage: 'indicators.pisa-math.header.b',
        },
      },
    },
    'pisa-reading': {
      header: {
        a: {
          id: `${scope}.indicators.pisa-reading.header.a`,
          defaultMessage: 'indicators.pisa-reading.header.a',
        },
        b: {
          id: `${scope}.indicators.pisa-reading.header.b`,
          defaultMessage: 'indicators.pisa-reading.header.b',
        },
      },
    },
    'not-stunted': {
      header: {
        a: {
          id: `${scope}.indicators.not-stunted.header.a`,
          defaultMessage: 'indicators.not-stunted.header.a',
        },
        b: {
          id: `${scope}.indicators.not-stunted.header.b`,
          defaultMessage: 'indicators.not-stunted.header.b',
        },
      },
    },
    'food-security': {
      header: {
        a: {
          id: `${scope}.indicators.food-security.header.a`,
          defaultMessage: 'indicators.food-security.header.a',
        },
        b: {
          id: `${scope}.indicators.food-security.header.b`,
          defaultMessage: 'indicators.food-security.header.b',
        },
      },
    },
    'adult-survival': {
      header: {
        a: {
          id: `${scope}.indicators.adult-survival.header.a`,
          defaultMessage: 'indicators.adult-survival.header.a',
        },
        b: {
          id: `${scope}.indicators.adult-survival.header.b`,
          defaultMessage: 'indicators.adult-survival.header.b',
        },
      },
    },
    'under-5-survival': {
      header: {
        a: {
          id: `${scope}.indicators.under-5-survival.header.a`,
          defaultMessage: 'indicators.under-5-survival.header.a',
        },
        b: {
          id: `${scope}.indicators.under-5-survival.header.b`,
          defaultMessage: 'indicators.under-5-survival.header.b',
        },
      },
    },
    contraception: {
      header: {
        a: {
          id: `${scope}.indicators.contraception.header.a`,
          defaultMessage: 'indicators.contraception.header.a',
        },
        b: {
          id: `${scope}.indicators.contraception.header.b`,
          defaultMessage: 'indicators.contraception.header.b',
        },
      },
    },
    'birth-weight': {
      header: {
        a: {
          id: `${scope}.indicators.birth-weight.header.a`,
          defaultMessage: 'indicators.birth-weight.header.a',
        },
        b: {
          id: `${scope}.indicators.birth-weight.header.b`,
          defaultMessage: 'indicators.birth-weight.header.b',
        },
      },
    },
    'water-in-home': {
      header: {
        a: {
          id: `${scope}.indicators.water-in-home.header.a`,
          defaultMessage: 'indicators.water-in-home.header.a',
        },
        b: {
          id: `${scope}.indicators.water-in-home.header.b`,
          defaultMessage: 'indicators.water-in-home.header.b',
        },
      },
    },
    'basic-sanitation': {
      header: {
        a: {
          id: `${scope}.indicators.basic-sanitation.header.a`,
          defaultMessage: 'indicators.basic-sanitation.header.a',
        },
        b: {
          id: `${scope}.indicators.basic-sanitation.header.b`,
          defaultMessage: 'indicators.basic-sanitation.header.b',
        },
      },
    },
    'safe-sanitation': {
      header: {
        a: {
          id: `${scope}.indicators.safe-sanitation.header.a`,
          defaultMessage: 'indicators.safe-sanitation.header.a',
        },
        b: {
          id: `${scope}.indicators.safe-sanitation.header.b`,
          defaultMessage: 'indicators.safe-sanitation.header.b',
        },
      },
    },
    'affordable-housing': {
      header: {
        a: {
          id: `${scope}.indicators.affordable-housing.header.a`,
          defaultMessage: 'indicators.affordable-housing.header.a',
        },
        b: {
          id: `${scope}.indicators.affordable-housing.header.b`,
          defaultMessage: 'indicators.affordable-housing.header.b',
        },
      },
    },
    'relative-poverty': {
      header: {
        a: {
          id: `${scope}.indicators.relative-poverty.header.a`,
          defaultMessage: 'indicators.relative-poverty.header.a',
        },
        b: {
          id: `${scope}.indicators.relative-poverty.header.b`,
          defaultMessage: 'indicators.relative-poverty.header.b',
        },
      },
    },
    'absolute-poverty': {
      header: {
        a: {
          id: `${scope}.indicators.absolute-poverty.header.a`,
          defaultMessage: 'indicators.absolute-poverty.header.a',
        },
        b: {
          id: `${scope}.indicators.absolute-poverty.header.b`,
          defaultMessage: 'indicators.absolute-poverty.header.b',
        },
      },
    },
    'longterm-unemployment': {
      header: {
        a: {
          id: `${scope}.indicators.longterm-unemployment.header.a`,
          defaultMessage: 'indicators.longterm-unemployment.header.a',
        },
        b: {
          id: `${scope}.indicators.longterm-unemployment.header.b`,
          defaultMessage: 'indicators.longterm-unemployment.header.b',
        },
      },
    },
  },
});
