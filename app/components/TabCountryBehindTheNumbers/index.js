/**
 *
 * TabCountryBehindTheNumbers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { ResponsiveContext, Button, Text as GText } from 'grommet';
import { CircleQuestion } from 'grommet-icons';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import BehindTheNumbersQol from '../BehindTheNumbersQol';
import rootMessages from 'messages';

function TabCountryBehindTheNumbers() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <h2>
            <FormattedMessage {...rootMessages.BehindTheNumbers.header} />
          </h2>
          <BehindTheNumbersQol />
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabCountryBehindTheNumbers.propTypes = {};

export default injectIntl(TabCountryBehindTheNumbers);
