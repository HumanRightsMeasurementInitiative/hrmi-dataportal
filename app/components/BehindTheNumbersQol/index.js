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

import infographicSanitation from 'images/People-Infographics-China-Sanitation.png';
import infographicWater from 'images/People-Infographics-China-Water.png';

import infographicSanitationSC from 'images/People-Infographics-China-Sanitation-SC.png';
import infographicWaterSC from 'images/People-Infographics-China-Water-SC.png';

const BreakBefore = styled(Box)`
  @media print {
    position: ${({ shouldBreak }) => (shouldBreak ? 'relative' : 'initial')};
    break-before: ${({ shouldBreak }) => (shouldBreak ? 'page' : 'initial')};
    margin-top: ${({ shouldBreak }) => (shouldBreak ? '-150px' : '0px')};
  }
`;

function BehindTheNumbersQol({ intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <React.Fragment>
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
            <Box width="100%" textAlign="center">
              {intl.locale === 'en' && <Image src={infographicSanitation} />}
              {intl.locale === 'zh' && <Image src={infographicSanitationSC} />}
            </Box>
            <br />
            <ReactMarkdown children={intl.formatMessage(messages.part2)} />
            <br />
            <Box width="100%" textAlign="center">
              {intl.locale === 'en' && <Image src={infographicWater} />}
              {intl.locale === 'zh' && <Image src={infographicWaterSC} />}
            </Box>
            <br />
            <BreakBefore shouldBreak={true} />
            <ReactMarkdown children={intl.formatMessage(messages.part3)} />
            <br />
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.peopleAtRiskHeader} />
            </Text>
            <ReactMarkdown
              children={intl.formatMessage(messages.peopleAtRisk)}
            />
            <br />
            <ReactMarkdown children={intl.formatMessage(messages.part4)} />
            <br />
            <BreakBefore shouldBreak={true} />
            <Text as="h4" fontWeight={600} fontSize={18}>
              <FormattedMessage {...messages.roomForImprovementHeader} />
            </Text>
            <ReactMarkdown
              children={intl.formatMessage(messages.roomForImprovement)}
            />
            <br />
          </Box>
        </React.Fragment>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersQol.propTypes = {};

export default injectIntl(BehindTheNumbersQol);
