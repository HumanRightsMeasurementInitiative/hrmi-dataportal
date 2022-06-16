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

import infographicSanitationTC from 'images/People-Infographics-China-Sanitation-TC.png';
import infographicWaterTC from 'images/People-Infographics-China-Water-TC.png';

const BreakBefore = styled(Box)`
  @media print {
    position: ${({ shouldBreak }) => (shouldBreak ? 'relative' : 'initial')};
    break-before: ${({ shouldBreak }) => (shouldBreak ? 'page' : 'initial')};
    margin-top: ${({ shouldBreak }) => (shouldBreak ? '-150px' : '0px')};
  }
`;

function BehindTheNumbersQolTC({ intl }) {
  if (intl.locale !== 'zh') {
    return null;
  }
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box>
          <Text as="h3" fontWeight={600} fontSize={21}>
            <FormattedMessage {...messages.tc.header} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.tc.part1)} />
          <br />
          <Box width="100%" textAlign="center">
            {intl.locale === 'zh' && <Image src={infographicSanitationTC} />}
          </Box>
          <br />
          <ReactMarkdown children={intl.formatMessage(messages.tc.part2)} />
          <br />
          <Box width="100%" textAlign="center">
            {intl.locale === 'zh' && <Image src={infographicWaterTC} />}
          </Box>
          <br />
          <BreakBefore shouldBreak={true} />
          <ReactMarkdown children={intl.formatMessage(messages.tc.part3)} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.tc.peopleAtRiskHeader} />
          </Text>
          <ReactMarkdown
            children={intl.formatMessage(messages.tc.peopleAtRisk)}
          />
          <br />
          <ReactMarkdown children={intl.formatMessage(messages.tc.part4)} />
          <br />
          <BreakBefore shouldBreak={true} />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.tc.roomForImprovementHeader} />
          </Text>
          <ReactMarkdown
            children={intl.formatMessage(messages.tc.roomForImprovement)}
          />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersQolTC.propTypes = {};

export default injectIntl(BehindTheNumbersQolTC);
