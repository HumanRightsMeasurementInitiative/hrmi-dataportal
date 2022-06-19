/**
 *
 * TabCountryBehindTheNumbers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { ResponsiveContext, Button, Image, Text as GText } from 'grommet';
import { CircleQuestion } from 'grommet-icons';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import rootMessages from 'messages';

import CprChart from '../CprChart';

const BreakBefore = styled(Box)`
  @media print {
    position: ${({ shouldBreak }) => (shouldBreak ? 'relative' : 'initial')};
    break-before: ${({ shouldBreak }) => (shouldBreak ? 'page' : 'initial')};
    margin-top: ${({ shouldBreak }) => (shouldBreak ? '-150px' : '0px')};
  }
`;

function BehindTheNumbersSfsTC({ intl }) {
  if (intl.locale !== 'zh') {
    return null;
  }

  const metrics = {
    arrest: {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'physint',
      key: 'arrest',
      code: 'arrest',
      dimension: 'physint',
      type: 'cpr',
      resource: 'cprScores',
    },
    disappearance: {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'physint',
      key: 'disappearance',
      code: 'disap',
      dimension: 'physint',
      type: 'cpr',
      resource: 'cprScores',
    },
    'death-penalty': {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'physint',
      key: 'death-penalty',
      code: 'dpex',
      dimension: 'physint',
      type: 'cpr',
      resource: 'cprScores',
    },
    'extrajud-killing': {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'physint',
      key: 'extrajud-killing',
      code: 'exkill',
      dimension: 'physint',
      type: 'cpr',
      resource: 'cprScores',
    },
    torture: {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'physint',
      key: 'torture',
      code: 'tort',
      dimension: 'physint',
      type: 'cpr',
      resource: 'cprScores',
    },
  };

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box>
          {intl.locale !== 'en' && intl.locale !== 'zh' && (
            <Text fontStyle="italic">
              <FormattedMessage
                {...rootMessages.BehindTheNumbers.noAnalysisInLanguage}
              />
            </Text>
          )}
          <Text as="h3" fontWeight={600} fontSize={21}>
            <FormattedMessage {...messages.tc.header} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.tc.part1)} />
          <br />
          <BreakBefore shouldBreak={true} />
          <a href={`/${intl.locale}/metric/arrest?subregion=east-asia`}>
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.tc.arrestHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['arrest']} selectedYear={2021} />
          <br />

          <a href={`/${intl.locale}/metric/disappearance?subregion=east-asia`}>
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.tc.disappearanceHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['disappearance']} selectedYear={2021} />
          <br />

          <a href={`/${intl.locale}/metric/death-penalty?subregion=east-asia`}>
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.tc.deathPenaltyHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['death-penalty']} selectedYear={2021} />
          <br />

          <BreakBefore shouldBreak={true} />
          <a
            href={`/${intl.locale}/metric/extrajud-killing?subregion=east-asia`}
          >
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.tc.extraJudKillingHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['extrajud-killing']} selectedYear={2021} />
          <br />

          <a href={`/${intl.locale}/metric/torture?subregion=east-asia`}>
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.tc.tortureHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['torture']} selectedYear={2021} />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersSfsTC.propTypes = {};

export default injectIntl(BehindTheNumbersSfsTC);
