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

function BehindTheNumbersEmp({ intl }) {
  const metrics = {
    assembly: {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'empowerment',
      key: 'assembly',
      code: 'assem',
      dimension: 'empowerment',
      type: 'cpr',
      resource: 'cprScores',
    },
    expression: {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'empowerment',
      key: 'expression',
      code: 'express',
      dimension: 'empowerment',
      type: 'cpr',
      resource: 'cprScores',
    },
    participation: {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: 'empowerment',
      key: 'participation',
      code: 'polpart',
      dimension: 'empowerment',
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
            <FormattedMessage {...messages.header} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.part1)} />
          <br />
          <BreakBefore shouldBreak={true} />
          <a
            href={`/${intl.locale}/metric/assembly?subregion=east-asia`}
            style={{ textDecorationColor: '#262262' }}
          >
            <Text
              as="h4"
              fontWeight={600}
              fontSize={18}
              color="empowermentDark"
            >
              <FormattedMessage {...messages.assemblyHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['assembly']} selectedYear={2021} />
          <br />
          <a
            href={`/${intl.locale}/metric/expression?subregion=east-asia`}
            style={{ textDecorationColor: '#262262' }}
          >
            <Text
              as="h4"
              fontWeight={600}
              fontSize={18}
              color="empowermentDark"
            >
              <FormattedMessage {...messages.expressionHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['expression']} selectedYear={2021} />
          <br />
          <a
            href={`/${intl.locale}/metric/participation?subregion=east-asia`}
            style={{ textDecorationColor: '#262262' }}
          >
            <Text
              as="h4"
              fontWeight={600}
              fontSize={18}
              color="empowermentDark"
            >
              <FormattedMessage {...messages.participationHeader} />
            </Text>
          </a>
          <CprChart metric={metrics['participation']} selectedYear={2021} />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersEmp.propTypes = {};

export default injectIntl(BehindTheNumbersEmp);
