/*
 * Source Messages
 *
 * This contains all the text for the Source component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.FAQs';

export default defineMessages({
  methodology: {
    id: `${scope}.methodology`,
    defaultMessage: 'Learn more about the HRMI methodology',
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
    grades: {
      id: `${scope}.answers.grades`,
      defaultMessage:
        'The labels on the graphs of good, fair, bad, and very bad are used here to give a general indication of how to understand the scores. They are NOT comprehensive descriptions of a country’s performance on an individual right.',
    },
  },
});
