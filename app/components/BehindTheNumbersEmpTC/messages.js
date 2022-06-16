/*
 * CountryOverview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.BehindTheNumbers.China.Emp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Empowerment',
  },
  part1: {
    id: `${scope}.part1`,
    defaultMessage:
      'The Chinese government limits civil liberties and political freedom, with China scoring a very low 2.1 out of 10 in empowerment rights. This is the lowest score in our sample of 30 countries. \n\nFor the **rights to assembly and association, opinion and expression**, and participation in government, all of China’s scores fall into the ‘very bad’ range. For all three rights, the human rights experts we surveyed agreed overwhelmingly that ‘all people’ were at risk of violations of these rights.\n\nWhen it comes to the **right to assembly and association**, China scores 2 out of 10, and human rights experts identified a wide range of people not enjoying their rights, including human rights advocates, protestors, and people criticising or opposing the government, as well as those from ethnic and religious minorities. They also noted that people from religious minorities cannot freely gather, and that even small gatherings in homes have been broken up by authorities.\n\nChina’s score for the **right to opinion and expression** is a very low 2.3 out of 10, with no improvement from 2021. Respondents noted that there are no independent media organisations allowed in China, and that teachers, academics, and journalists cannot speak freely. Expression is also limited online, where content is censored by Chinese regulators.\n\nChina also scores in the ‘very bad’ range for the **right to participate in government**, with a score of 1.9 out of 10. Respondents noted that political participation is controlled and severely limited by the Chinese Communist Party, which selects legislators and other political representatives.\n\nOther vulnerable groups include:\n\n- People from ethnic minorities, including Tibetans, Uyghurs, Mongolians, and Kazakhs\n- Human rights advocates, protestors, and anyone who criticises the government\n- Detainees and those accused of crimes\n- People from religious minorities, particularly those practising Falun Gong, Christianity, or Islam\n- Internally displaced people\n- People in Tibet and Xinjiang',
  },
  assemblyHeader: {
    id: `${scope}.assemblyHeader`,
    defaultMessage: 'Right to Assembly and Association in East Asia',
  },
  expressionHeader: {
    id: `${scope}.expressionHeader`,
    defaultMessage: 'Right to Opinion and Expression in East Asia',
  },
  participationHeader: {
    id: `${scope}.participationHeader`,
    defaultMessage: 'Right to Participate in Government in East Asia',
  },
  tc: {
    header: {
      id: `${scope}.tc.header`,
      defaultMessage: '',
    },
    part1: {
      id: `${scope}.tc.part1`,
      defaultMessage: '',
    },
    assemblyHeader: {
      id: `${scope}.tc.assemblyHeader`,
      defaultMessage: '',
    },
    expressionHeader: {
      id: `${scope}.tc.expressionHeader`,
      defaultMessage: '',
    },
    participationHeader: {
      id: `${scope}.tc.participationHeader`,
      defaultMessage: '',
    },
  },
});
