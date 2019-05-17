/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNarrative';

export default defineMessages({
  esr: {
    noData: {
      id: `${scope}.esr.noData`,
      defaultMessage:
        'For {needsArticle, select, true {the } false { }}{country} a {dimension} score is not available due to missing data for at least one component of the rights to food, health, education, housing and work. Missing data tells us that {needsArticle, select, true {the } false { }}{country} has not submitted some information to the relevant international databases. With more funding, HRMI could investigate the reason for each data gap, and explore ways to help fill it.',
    },
    start: {
      id: `${scope}.esr.start`,
      defaultMessage:
        '{dimension} rights (or ‘economic and social rights’) include the rights to food, health, education, housing, and work. HRMI gives two scores, measuring against two different benchmarks.',
    },
    scoreAdjusted: {
      id: `${scope}.esr.scoreAdjusted`,
      defaultMessage:
        "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} scores {scoreAdjustedBold} on {dimension} when scored against the '{benchmarkAdjusted}' benchmark. ",
    },
    scoreAdjustedExplanation: {
      id: `${scope}.esr.scoreAdjustedExplanation`,
      defaultMessage:
        "This score takes into account {country}'{isPlural, select, true {} false {s}} resources and how well it is using them to make sure its people's {dimension} rights are fulfilled. ",
    },
    scoreAdjustedAnalysis: {
      id: `${scope}.esr.scoreAdjustedAnalysis`,
      defaultMessage:
        'This score tells us that {needsArticle, select, true {the } false { }}{country} is {less99adjusted, select, true {only } false {}} doing {scoreAdjusted} of what should be possible right now with the resources it has. Since anything less than 100% indicates that a country is not meeting its current duty under international human rights law, our assessment is that {needsArticle, select, true {the } false { }}{country} ',
    },
    scoreRange: {
      a: {
        id: `${scope}.esr.scoreRange.a`,
        defaultMessage: 'has a very long way to go ',
      },
      b: {
        id: `${scope}.esr.scoreRange.b`,
        defaultMessage: 'has a long way to go ',
      },
      c: {
        id: `${scope}.esr.scoreRange.c`,
        defaultMessage: 'has some way to go ',
      },
      d: {
        id: `${scope}.esr.scoreRange.d`,
        defaultMessage: 'is close ',
      },
    },
    scoreAdjustedEnd: {
      id: `${scope}.esr.scoreAdjustedEnd`,
      defaultMessage: 'to meet its immediate economic and social rights duty.',
    },
    scoreBestAnalysis: {
      id: `${scope}.esr.scoreBestAnalysis`,
      defaultMessage:
        "When measured against the '{benchmarkBest}' benchmark, comparing {needsArticle, select, true {the } false { }}{country} to the best performance of any country in the world, {needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} score is {scoreBestBold}, indicating that it ",
    },
    scoreBestEnd: {
      id: `${scope}.esr.scoreBestEnd`,
      defaultMessage:
        "to meet current '{benchmarkBest}' standards for ensuring all people have adequate food, education, healthcare, housing and work. ",
    },
  },
  cpr: {
    noData: {
      id: `${scope}.cpr.noData`,
      defaultMessage:
        '{physint} and {empowerment} data have not yet been produced for {needsArticle, select, true {the} false {}} {country}. We plan to expand our data collection for these rights to the whole world as soon as increased funding becomes available.',
    },
    start: {
      id: `${scope}.cpr.start`,
      defaultMessage:
        "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} {dimension} score of {scoreBold} suggests that ",
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
