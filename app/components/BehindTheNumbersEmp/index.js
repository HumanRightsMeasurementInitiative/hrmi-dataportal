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

import CprChart from '../CprChart';

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
          <Text as="h3" fontWeight={600} fontSize={21}>
            <FormattedMessage {...messages.header} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.part1)} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={19}>
            <FormattedMessage {...messages.assemblyHeader} />
          </Text>
          <CprChart metric={metrics['assembly']} selectedYear={2021} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={19}>
            <FormattedMessage {...messages.expressionHeader} />
          </Text>
          <CprChart metric={metrics['expression']} selectedYear={2021} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={19}>
            <FormattedMessage {...messages.participationHeader} />
          </Text>
          <CprChart metric={metrics['participation']} selectedYear={2021} />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersEmp.propTypes = {};

export default injectIntl(BehindTheNumbersEmp);
