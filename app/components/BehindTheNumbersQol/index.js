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

function BehindTheNumbersQol({ intl }) {
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
          <Box width="100%" textAlign="center">
            <Image src={infographicSanitation} />
          </Box>
          <br />
          <ReactMarkdown children={intl.formatMessage(messages.part2)} />
          <br />
          <Box width="100%" textAlign="center">
            <Image src={infographicWater} />
          </Box>
          <br />
          <ReactMarkdown children={intl.formatMessage(messages.part3)} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.peopleAtRiskHeader} />
          </Text>
          <ReactMarkdown children={intl.formatMessage(messages.peopleAtRisk)} />
          <br />
          <Text as="h4" fontWeight={600} fontSize={18}>
            <FormattedMessage {...messages.roomForImprovementHeader} />
          </Text>
          <ReactMarkdown
            children={intl.formatMessage(messages.roomForImprovement)}
          />
          <br />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersQol.propTypes = {};

export default injectIntl(BehindTheNumbersQol);
