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

function BehindTheNumbersSfs({ intl }) {
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
            <FormattedMessage {...messages.header} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.part1)} />
          <br />

          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.arrestHeader} />
          </Text>
          <CprChart metric={metrics['arrest']} selectedYear={2021} />
          <br />

          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.disappearanceHeader} />
          </Text>
          <CprChart metric={metrics['disappearance']} selectedYear={2021} />
          <br />

          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.deathPenaltyHeader} />
          </Text>
          <CprChart metric={metrics['death-penalty']} selectedYear={2021} />
          <br />

          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.extraJudKillingHeader} />
          </Text>
          <CprChart metric={metrics['extrajud-killing']} selectedYear={2021} />
          <br />

          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.tortureHeader} />
          </Text>
          <CprChart metric={metrics['torture']} selectedYear={2021} />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersSfs.propTypes = {};

export default injectIntl(BehindTheNumbersSfs);
