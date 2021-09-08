/*
 * Source Messages
 *
 * This contains all the text for the Source component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.FAQs';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'FAQs',
  },
  methodology: {
    id: `${scope}.methodology`,
    defaultMessage: 'Learn more about the HRMI methodology',
  },
  methodologyUncertainty: {
    id: `${scope}.methodologyUncertainty`,
    defaultMessage: 'Learn more about the HRMI methodology',
  },
  methodologyUncertaintyURL: {
    id: `${scope}.methodologyUncertaintyURL`,
    defaultMessage: 'Learn more about the HRMI methodology',
  },
  methodologyGrades: {
    id: `${scope}.methodologyGrades`,
    defaultMessage: 'placeghoderfsdgh',
  },
  questions: {
    scale: {
      id: `${scope}.questions.scale`,
      defaultMessage: 'Why are the two types of metrics not on the same scale?',
    },
    year: {
      id: `${scope}.questions.year`,
      defaultMessage: 'Why are the two sets of metrics not for the same year?',
    },
    standards: {
      id: `${scope}.questions.standards`,
      defaultMessage:
        'What is the difference between the two assessment standards?',
    },
    benchmarks: {
      id: `${scope}.questions.benchmarks`,
      defaultMessage:
        'What is the difference between the two performance benchmarks?',
    },
    indicators: {
      id: `${scope}.questions.indicators`,
      defaultMessage: 'Why aren’t the same indicators used for all countries?',
    },
    measureIndicators: {
      id: `${scope}.questions.measureIndicators`,
      defaultMessage:
        'How does the HRMI methodology calculate the {metric} score from raw data?',
    },
    measureRightESR: {
      id: `${scope}.questions.measureRightESR`,
      defaultMessage:
        'How does the HRMI methodology convert the above indicators into the {metric} metric?',
    },
    measureRightCPR: {
      id: `${scope}.questions.measureRightCPR`,
      defaultMessage: 'How has HRMI measured the {metric}?',
    },
    measureDimensionESR: {
      id: `${scope}.questions.measureDimensionESR`,
      defaultMessage: 'How has HRMI measured {metric}?',
    },
    measureDimensionCPR: {
      id: `${scope}.questions.measureDimensionCPR`,
      defaultMessage: 'How has HRMI measured {metric}?',
    },
    uncertainty: {
      id: `${scope}.questions.uncertainty`,
      defaultMessage: 'Why do some uncertainty bands go under 0 or above 10?',
    },
    grades: {
      id: `${scope}.questions.grades`,
      defaultMessage:
        'What do the good, fair, bad, and very bad ranges mean, exactly?',
    },
    where: {
      id: `${scope}.questions.where`,
      defaultMessage: "Where do HRMI's scores come from?",
    },
    how: {
      id: `${scope}.questions.how`,
      defaultMessage: 'How does HRMI define these rights?',
    },
    difference: {
      id: `${scope}.questions.difference`,
      defaultMessage:
        'What is the difference between HRMI scores and indicator values?',
    },
    why: {
      id: `${scope}.questions.why`,
      defaultMessage:
        'Why does HRMI use these indicators to measure these rights?',
    },
    whereViolence: {
      id: `${scope}.questions.whereViolence`,
      defaultMessage: "Where do HRMI's scores come from?",
    },
    'whereViolence-indicator': {
      id: `${scope}.questions.whereViolence-indicator`,
      defaultMessage:
        "Where do HRMI's right to freedom from violence scores come from?",
    },
    violenceInfo: {
      id: `${scope}.questions.violenceInfo`,
      defaultMessage:
        'What is the government’s responsibility with regard to community violence?',
    },
  },
  answers: {
    scale: {
      id: `${scope}.answers.scale`,
      defaultMessage:
        'HRMI metrics use two different methodologies that have different scales and interpretations. The scores for the civil and political rights metrics are a score out of 10 indicating the extent to which the government in the country respected that right. By contrast, the scores for the economic and social rights metrics are percentage scores. These tell you the percentage level of enjoyment achieved on that right relative to what should be feasible for a country with that income level. This is not the same as the extent to which people in the country enjoy the right',
    },
    year: {
      id: `${scope}.answers.year`,
      defaultMessage:
        'All metrics presented are the most recent data available. The civil and political rights metrics are for January to June 2017. The economic and social rights metrics are from the 2017 update of the International Social and Economic Rights Fulfilment Index, which covers the period from 2005 to 2015. The data used for each year are the most recently available data as of that year. HRMI graphs use the most recently available data from the full dataset.',
    },
    indicators: {
      id: `${scope}.answers.indicators`,
      defaultMessage:
        'This is because the same data are not always collected for all countries in the world. The core assessment standard is mostly used for developing and non-OECD-member countries. The high-income OECD country assessment standard uses indicators that are often available only for high-income OECD countries. However, all countries are evaluated using both sets of indicators to the extent data are available.',
    },
    measureIndicators: {
      id: `${scope}.answers.measureIndicators`,
      defaultMessage: ' ',
    },
    measureRightESR: {
      id: `${scope}.answers.measureRightESR`,
      defaultMessage:
        'All HRMI measures of economic and social rights have been produced using official statistics collected by national governments and harmonised by international organisations. For each indicator, our methodology compares the observed level of enjoyment of that dimension of human rights to the enjoyment level it should be feasible for that country to achieve given its per-capita income level. HRMI economic and social rights metrics thus show how well the State is using its available resources to ensure that all people enjoy these rights.',
    },
    measureRightESRNotesIntro: {
      id: `${scope}.answers.measureRightESRNotesIntro`,
      defaultMessage:
        'Three things should be kept in mind when interpreting HRMI economic and social rights metrics',
    },
    measureRightESRNotesOne: {
      id: `${scope}.answers.measureRightESRNotesOne`,
      defaultMessage:
        'A score of 100% does NOT imply that everyone in the country enjoys the right. Rather, it implies that the country’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level.',
    },
    measureRightESRNotesTwo: {
      id: `${scope}.answers.measureRightESRNotesTwo`,
      defaultMessage:
        'A score of 100% does NOT mean there is no room for improvement. Countries with high HRMI scores still need to innovate to extend human rights enjoyment further than has been done in the past.',
    },
    measureRightESRNotesThree: {
      id: `${scope}.answers.measureRightESRNotesThree`,
      defaultMessage:
        'The fact that a high-income country earns a high HRMI score on a right does NOT imply that all population subgroups (e.g. women or indigenous people) in that country enjoy the right equally.',
    },
    measureRightCPR: {
      id: `${scope}.answers.measureRightCPR`,
      defaultMessage:
        'Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown.',
    },
    measureDimensionESR: {
      id: `${scope}.answers.measureDimensionESR`,
      defaultMessage: 'TODO: ESR dimensions are calculated...',
    },
    measureDimensionCPR: {
      id: `${scope}.answers.measureDimensionCPR`,
      defaultMessage: ' ',
    },
    uncertainty: {
      id: `${scope}.answers.uncertainty`,
      defaultMessage:
        'The short answer is that this sometimes happens when we convert our statistical calculations into scores from 0 to 10, and it doesn’t mean anything special.',
    },
    uncertaintyLong: {
      id: `${scope}.answers.uncertaintyLong`,
      defaultMessage: 'long answer',
    },
    grades: {
      id: `${scope}.answers.grades`,
      defaultMessage:
        'The labels on the graphs of good, fair, bad, and very bad are used here to give a general indication of how to understand the scores. They are NOT comprehensive descriptions of a country’s performance on an individual right.',
    },
    where: {
      both: {
        id: `${scope}.answers.where.both`,
        defaultMessage:
          'We use two different methodologies.\n\n To measure <b>Quality of Life</b> – economic and social rights – we start with data from international databases. Then we use econometric techniques to combine the data with each country’s level of income, to produce a score. The score, expressed as a percentage, shows how well a country is using its resources to produce good human rights outcomes. Every country should be able to get near its 100% income-adjusted target by improving policies and practices, even without more money.\n\n To measure <b>Safety from the State</b> and <b>Empowerment</b> rights – civil and political rights – we do our own research, using an expert survey methodology. In a secure, anonymous, online questionnaire, we ask local human rights experts (such as people working for human rights organisations; human rights lawyers; journalists specialising in social issues) a series of detailed questions about government behaviour in the previous year. We use Bayesian statistical techniques to produce a score out of ten, displayed within an uncertainty band that shows the range of scores we calculate as most likely to represent the real situation in that country.',
      },
      esr: {
        id: `${scope}.answers.where.esr`,
        defaultMessage:
          'We use two different methodologies.\n\n To measure <b>Quality of Life</b> – economic and social rights – we start with data from international databases. Then we use econometric techniques to combine the data with each country’s level of income, to produce a score. The score, expressed as a percentage, shows how well a country is using its resources to produce good human rights outcomes. Every country should be able to get near its 100% income-adjusted target by improving policies and practices, even without more money.',
      },
      cpr: {
        id: `${scope}.answers.where.cpr`,
        defaultMessage:
          'We use two different methodologies.\n\n To measure <b>Safety from the State</b> and <b>Empowerment</b> rights – civil and political rights – we do our own research, using an expert survey methodology. In a secure, anonymous, online questionnaire, we ask local human rights experts (such as people working for human rights organisations; human rights lawyers; journalists specialising in social issues) a series of detailed questions about government behaviour in the previous year. We use Bayesian statistical techniques to produce a score out of ten, displayed within an uncertainty band that shows the range of scores we calculate as most likely to represent the real situation in that country.',
      },
    },
    how: {
      id: `${scope}.answers.how`,
      defaultMessage:
        'We base all our measurements on the definitions of human rights contained in international law.\n\n When you are looking at a country’s scores, you can click on the name of each right on the graph and see the definition, and the legal source.',
    },
    difference: {
      id: `${scope}.answers.difference`,
      defaultMessage:
        "The indicator values are about people's experiences in each country. The HRMI scores are about how well each government is meeting its human rights obligations.\n\n Our methodology starts with indicator values, which show what percentage of people in a country meet the indicator definition. Then we turn those indicator values into HRMI scores which show how well a country's government is doing at making sure its people enjoy their rights, given what should be possible at its level of income.",
    },
    why: {
      id: `${scope}.answers.why`,
      defaultMessage:
        'For each economic and social right, the SERF Index methodology, which HRMI uses, selects a small number of high-level ‘bellwether’ indicators to give an overview of people’s experiences in each country. The scores produced can be tracked and compared over time, and across countries.\n\n The choice of indicators is also influenced by what data are available in international databases for enough countries in the world.',
    },
    whereViolence: {
      id: `${scope}.answers.whereViolence`,
      defaultMessage:
        'Every year we use a secure, anonymous, online survey to ask human rights experts about the situation in their country. As well as the questions we ask all respondents about civil and political rights, and economic and social rights, for Pacific countries we ask an extra set of questions about issues of particular importance in the region.\n\n For the first four issues on this page, we ask a single question, and present the average response along a continuum, along with extra information given by respondents. These scores are not comparable between different countries.\n\n For questions about violence in the community, we use a range of questions, and Bayesian statistical techniques, to produce a score out of ten, displayed within an uncertainty band that shows the range of scores we calculate as most likely to represent the real situation in that country. These scores are comparable across time and across countries. You can compare countries by finding the ‘Right to freedom from violence’ section in the ‘Rights’ menu above.',
    },
    'whereViolence-indicator': {
      id: `${scope}.answers.whereViolence-indicator`,
      defaultMessage:
        'Every year we use a secure, anonymous, online survey to ask human rights experts about the situation in their country. As well as the questions we ask all respondents about civil and political rights, and economic and social rights, for Pacific countries we ask an extra set of questions about issues of particular importance in the region.\n\n For questions about violence in the community, we use Bayesian statistical techniques to produce a score out of ten, displayed within an uncertainty band that shows the range of scores we calculate as most likely to represent the real situation in that country.',
    },
    violenceInfo: {
      vchild: {
        id: `${scope}.answers.violenceInfo.vchild`,
        defaultMessage:
          'Statements on the right of children to be free from violence can be found in Article 19 of the UN Convention on the Rights of the Child.',
      },
      vdisab: {
        id: `${scope}.answers.violenceInfo.vdisab`,
        defaultMessage:
          'Statements on the right of people with disabilities to be free from violence can be found in Article 16 of the Convention on the Rights of Persons with Disabilities.',
      },
      vmvpfaff: {
        id: `${scope}.answers.violenceInfo.vmvpfaff`,
        defaultMessage:
          'Statements on the right of MVPFAFF+/LGBTQIA+ people to be free from violence can be found in Human Rights Council Resolutions 17/19, 27/32, and 32/2, as well as in the Yogyakarta Principles and the Yogyakarta Principles plus 10, which apply existing international law in relation to sexual orientation and gender identity.',
      },
      vwomen: {
        id: `${scope}.answers.violenceInfo.vwomen`,
        defaultMessage:
          'Statements on the right of women and girls to be free from violence can be found in CEDAW Committee General Recommendations No. 19 and No. 35, as well as in the Declaration on the Elimination of Violence against Women.',
      },
    },
  },
});
