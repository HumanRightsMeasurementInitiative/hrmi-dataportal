/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNarrative';

export default defineMessages({
  compAssessment: {
    start: {
      id: `${scope}.compAssessment.start`,
      defaultMessage:
        'On {esr}, {countryWithArticle} {isPlural, select, true {are} false {is}} performing ',
    },
    result: {
      a: {
        id: `${scope}.compAssessment.result.a`,
        defaultMessage: 'better than average',
      },
      b: {
        id: `${scope}.compAssessment.result.b`,
        defaultMessage: 'worse than average',
      },
      c: {
        id: `${scope}.compAssessment.result.c`,
        defaultMessage: 'close to average',
      },
    },
  },
  compAssessmentCPR: {
    startHiOECD: {
      id: `${scope}.compAssessmentCPR.startHiOECD`,
      defaultMessage:
        'Compared with the {referenceCount} other high-income OECD countries we have civil and political rights data for, {needsArticle, select, true {the } false {}}{country} is performing ',
    },
    startNotHiOECD: {
      id: `${scope}.compAssessmentCPR.startNotHiOECD`,
      defaultMessage:
        'For the civil and political rights we do not have data for enough countries in {needsArticleRegion, select, true {the } false {}}{region} to do a regional comparison. However, compared to the other countries in our sample, {needsArticle, select, true {the } false {}}{country} is performing ',
    },
    end: {
      empowerment: {
        id: `${scope}.compAssessmentCPR.end.empowerment`,
        defaultMessage: ' on empowerment rights. ',
      },
      physint: {
        id: `${scope}.compAssessmentCPR.end.physint`,
        defaultMessage: ' on the right to be safe from the state. ',
      },
    },
    noData: {
      id: `${scope}.compAssessmentCPR.noData`,
      defaultMessage:
        '{physint} and {empowerment} data have not yet been produced for {needsArticle, select, true {the} false {}} {country}. We plan to expand our data collection for these rights to the whole world as soon as increased funding becomes available.',
    },
    noDataLinkURL: {
      id: `${scope}.compAssessmentCPR.noDataLinkURL`,
      defaultMessage: 'compAssessmentCPR.noDataLinkURL',
    },
    noDataLinkAnchor: {
      id: `${scope}.compAssessmentCPR.noDataLinkAnchor`,
      defaultMessage: 'compAssessmentCPR.noDataLinkAnchor',
    },
    noDataButSurvey: {
      id: `${scope}.compAssessmentCPR.noDataButSurvey`,
      defaultMessage: 'compAssessmentCPR.noDataButSurvey',
    },
    noDataButRights: {
      id: `${scope}.compAssessmentCPR.noDataButRights`,
      defaultMessage: 'compAssessmentCPR.noDataButRights',
    },
  },
  compAssessmentESR: {
    startHi: {
      id: `${scope}.compAssessmentESR.startHi`,
      defaultMessage: 'startHi',
    },
    endAll: {
      id: `${scope}.compAssessmentESR.endAll`,
      defaultMessage: 'end',
    },
    endOne: {
      id: `${scope}.compAssessmentESR.endOne`,
      defaultMessage: 'endOne',
    },
    endSome: {
      id: `${scope}.compAssessmentESR.endSome`,
      defaultMessage: ' endSome',
    },
    benchmarkNote: {
      id: `${scope}.compAssessmentESR.benchmarkNote`,
      defaultMessage:
        " (this comparison is calculated using the '{benchmark}' benchmark).",
    },
    noData: {
      id: `${scope}.compAssessmentESR.noData`,
      defaultMessage: 'compAssessmentESR.noData',
    },
    noDataFunding: {
      id: `${scope}.compAssessmentESR.noDataFunding`,
      defaultMessage:
        'With more funding, HRMI could investigate the reason for each data gap, and explore ways to help fill it.',
    },
  },
  esr: {
    changeStandardNote: {
      id: `${scope}.esr.changeStandardNote`,
      defaultMessage:
        "Please note: data and commentary are shown for the '{otherStandard}' assessment standard. For {incomeCategory} countries it is best to use the '{defaultStandard}' standard instead. ",
    },
    noData: {
      id: `${scope}.esr.noData`,
      defaultMessage:
        'For {needsArticle, select, true {the } false { }}{country} a {dimension} score is not available due to missing data for at least one component of the rights to food, health, education, housing and work. Missing data tells us that {needsArticle, select, true {the } false { }}{country} has not submitted some information to the relevant international databases.',
    },
    someData: {
      id: `${scope}.esr.someData`,
      defaultMessage:
        'Please explore the detail below (using the down arrow to the right) to see which rights have data available and which are missing. ',
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
    scoreBestSimple: {
      id: `${scope}.esr.scoreBestSimple`,
      defaultMessage:
        "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} scores {scoreBestBold} on {dimension} when scored against the '{benchmarkBest}' benchmark. ",
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
    scoreAdjustedRange: {
      a: {
        id: `${scope}.esr.scoreAdjustedRange.a`,
        defaultMessage: 'has a very long way to go ',
      },
      b: {
        id: `${scope}.esr.scoreAdjustedRange.b`,
        defaultMessage: 'has a long way to go ',
      },
      c: {
        id: `${scope}.esr.scoreAdjustedRange.c`,
        defaultMessage: 'has some way to go ',
      },
      d: {
        id: `${scope}.esr.scoreAdjustedRange.d`,
        defaultMessage: 'is close ',
      },
    },
    scoreBestRange: {
      a: {
        id: `${scope}.esr.scoreBestRange.a`,
        defaultMessage: 'has a very long way to go ',
      },
      b: {
        id: `${scope}.esr.scoreBestRange.b`,
        defaultMessage: 'has a long way to go ',
      },
      c: {
        id: `${scope}.esr.scoreBestRange.c`,
        defaultMessage: 'has some way to go ',
      },
      d: {
        id: `${scope}.esr.scoreBestRange.d`,
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
    govRespondents: {
      id: `${scope}.cpr.govRespondents`,
      defaultMessage:
        'Note: For {countryWithArticle}, because it has a very small population, we allowed some survey respondents to work for or with the government. This was only allowed for countries with a population of fewer than 120,000 people, and excluded politicians, police, and members of the military. For more information, please see the Methodology Handbook.',
    },
    start: {
      id: `${scope}.cpr.start`,
      defaultMessage:
        "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} {dimension} score of {scoreBold} suggests that ",
    },
    outOf10: {
      id: `${scope}.cpr.outOf10`,
      defaultMessage: 'out of 10',
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
