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
  },
});
