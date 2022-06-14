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

function BehindTheNumbersEmpTC({ intl }) {
  if (intl.locale !== 'zh') {
    return null;
  }

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
          <Text as="h3" fontWeight={600} fontSize={21}>
            <FormattedMessage {...messages.tc.header} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.tc.part1)} />
          <br />
          <BreakBefore shouldBreak={true} />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.tc.assemblyHeader} />
          </Text>
          <CprChart metric={metrics['assembly']} selectedYear={2021} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.tc.expressionHeader} />
          </Text>
          <CprChart metric={metrics['expression']} selectedYear={2021} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.tc.participationHeader} />
          </Text>
          <CprChart metric={metrics['participation']} selectedYear={2021} />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersEmpTC.propTypes = {};

export default injectIntl(BehindTheNumbersEmpTC);
