import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNotes';

export default defineMessages({
  hiNote: {
    id: `${scope}.hiNote`,
    defaultMessage:
      '{hiLabel} High income country. For these countries it is best to use the high income assessment standard.',
  },
  govResponseNote: {
    id: `${scope}.govResponseNote`,
    defaultMessage:
      '{labelSuperscript} Some survey respondents in the smallest countries worked for or with the government (only allowed for countries with a population of fewer than 120,000 people)',
  },
});
