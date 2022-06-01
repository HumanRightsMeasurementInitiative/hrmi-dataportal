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

import infographicSanitation from 'images/People-Infographics-China-Sanitation.png';

function BehindTheNumbersQol() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box>
          <h3>
            <FormattedMessage {...messages.header} />
          </h3>
          <Text style={{ whiteSpace: 'pre-line' }}>
            <FormattedMessage {...messages.part1} />
          </Text>
          <Box width="100%" textAlign="center">
            <Image src={infographicSanitation} />
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BehindTheNumbersQol.propTypes = {};

export default injectIntl(BehindTheNumbersQol);
