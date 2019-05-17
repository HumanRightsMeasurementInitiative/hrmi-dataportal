/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNarrative';

export default defineMessages({
  cpr: {
    noData: {
      id: `${scope}.cpr.noData`,
      defaultMessage:
        '{physint} and {empowerment} data have not yet been produced for {needsArticleEN, select, true {the} false {}} {country}. We plan to expand our data collection for these rights to the whole world as soon as increased funding becomes available.',
    },
    start: {
      id: `${scope}.cpr.start`,
      defaultMessage:
        "{needsArticleEN, select, true {The } false { }}{country}'{arePluralEN, select, true {s} false {}} {dimension} score of {score} suggests that ",
    },
    then: {
      empowerment: {
        a: {
          id: `${scope}.cpr.then.empowerment.a`,
          defaultMessage:
            'many people are not enjoying their civil liberties and political freedoms (freedom of speech, assembly and association, and democratic rights).',
        },
        b: {
          id: `${scope}.cpr.then.empowerment.b`,
          defaultMessage:
            'while many people are enjoying their civil liberties and political freedoms (freedom of speech, assembly and association, and democratic rights), a significant number are not.',
        },
        c: {
          id: `${scope}.cpr.then.empowerment.c`,
          defaultMessage:
            'while most people are enjoying their civil liberties and political freedoms (freedom of speech, assembly and association, and democratic rights), some are not.',
        },
      },
      physint: {
        a: {
          id: `${scope}.cpr.then.physint.a`,
          defaultMessage:
            'many people are not safe from arbitrary arrest, torture, disappearance, execution or extrajudicial killing.',
        },
        b: {
          id: `${scope}.cpr.then.physint.b`,
          defaultMessage:
            'a significant number of people are not safe from arbitrary arrest, torture, disappearance, execution or extrajudicial killing.',
        },
        c: {
          id: `${scope}.cpr.then.physint.c`,
          defaultMessage:
            'while most people are safe from arbitrary arrest, torture, disappearance, execution or extrajudicial killing, some are not.',
        },
      },
    },
  },
});
