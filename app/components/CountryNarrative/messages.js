/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNarrative';

export default defineMessages({
  atRiskSectionTitle: {
    id: `${scope}.atRiskSectionTitle`,
    defaultMessage: 'People at risk',
  },
  atRisk: {
    noData: {
      id: `${scope}.atRisk.noData`,
      defaultMessage:
        'At risk data have not yet been produced for {needsArticle, select, true {the} false {}} {country}. We plan to expand our data collection to the whole world as soon as increased funding becomes available. ',
    },
    start: {
      id: `${scope}.atRisk.start`,
      defaultMessage:
        'The human rights experts we surveyed identified the following people as being at most risk of rights violations. ',
    },
    tableGroupLabel: {
      id: `${scope}.atRisk.tableGroupLabel`,
      defaultMessage: 'People',
    },
    tableRightsLabel: {
      id: `${scope}.atRisk.tableRightsLabel`,
      defaultMessage: 'Rights they are more at risk for',
    },
    end: {
      beforeLink: {
        id: `${scope}.atRisk.end.beforeLink`,
        defaultMessage:
          'As well as these people, the experts identified others as also being at particular risk of rights violations. Click ',
      },
      link: {
        id: `${scope}.atRisk.end.link`,
        defaultMessage: 'here',
      },
      afterLink: {
        id: `${scope}.atRisk.end.afterLink`,
        defaultMessage:
          ' to see word clouds giving a more complete picture of which people in {needsArticle, select, true {the } false {}}{country} were identified as being especially vulnerable. ',
      },
    },
  },
  compAssessmentSectionTitle: {
    id: `${scope}.compAssessmentSectionTitle`,
    defaultMessage: 'Comparative assessment',
  },
  compAssessment: {
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
    hiOECD: {
      id: `${scope}.compAssessmentCPR.hiOECD`,
      defaultMessage:
        'Compared with the {referenceCount} other high-income OECD countries we have civil and political rights data for, {needsArticle, select, true {the } false {}}{country} is performing ',
    },
    notHiOECD: {
      id: `${scope}.compAssessmentCPR.notHiOECD`,
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
  },
  compAssessmentESR: {
    start: {
      id: `${scope}.compAssessmentESR.start`,
      defaultMessage:
        'On {esr}, {needsArticle, select, true {the } false { }}{country} is performing ',
    },
    end: {
      id: `${scope}.compAssessmentESR.end`,
      defaultMessage:
        ', compared with {referenceCount} other countries in {needsArticleRegion, select, true {the } false {}}{region}. ',
    },
    endHi: {
      id: `${scope}.compAssessmentESR.endHi`,
      defaultMessage:
        ', compared with {referenceCount} other HI countries in {needsArticleRegion, select, true {the } false {}}{region}. ',
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
