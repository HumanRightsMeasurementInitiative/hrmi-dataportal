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
import BehindTheNumbersSfs from '../BehindTheNumbersSfs';
import BehindTheNumbersEmp from '../BehindTheNumbersEmp';
import BehindTheNumbersQolTC from '../BehindTheNumbersQolTC';
import BehindTheNumbersSfsTC from '../BehindTheNumbersSfsTC';
import BehindTheNumbersEmpTC from '../BehindTheNumbersEmpTC';
import rootMessages from 'messages';

function TabCountryBehindTheNumbers() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <br />
          <br />
          <Text as="h2" fontWeight={600}>
            <FormattedMessage {...rootMessages.BehindTheNumbers.header} />
          </Text>
          <BehindTheNumbersQol />
          <br />
          <BehindTheNumbersSfs />
          <br />
          <BehindTheNumbersEmp />
          <br />
          <br />
          <BehindTheNumbersQolTC />
          <br />
          <BehindTheNumbersSfsTC />
          <br />
          <BehindTheNumbersEmpTC />
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabCountryBehindTheNumbers.propTypes = {};

export default injectIntl(TabCountryBehindTheNumbers);
