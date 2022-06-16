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

const BreakBefore = styled(Box)`
  @media print {
    position: ${({ shouldBreak }) => (shouldBreak ? 'relative' : 'initial')};
    break-before: ${({ shouldBreak }) => (shouldBreak ? 'page' : 'initial')};
    margin-top: ${({ shouldBreak }) => (shouldBreak ? '-150px' : '0px')};
  }
`;
function TabCountryBehindTheNumbers({ intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <a name="sc" />
          <br />
          <br />
          <BreakBefore shouldBreak={true} />
          {intl.locale === 'zh' && (
            <a
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#tc`}
              style={{ textDecoration: 'none' }}
            >
              <Text as="h2" fontWeight={600} color="secondary">
                (
                <FormattedMessage
                  {...rootMessages.BehindTheNumbers.tc.header}
                />
                )
              </Text>
            </a>
          )}
          <Text as="h2" fontWeight={600}>
            <FormattedMessage {...rootMessages.BehindTheNumbers.header} />
          </Text>
          <BehindTheNumbersQol />
          <br />
          <BreakBefore shouldBreak={true} />
          <BehindTheNumbersSfs />
          <br />
          <BreakBefore shouldBreak={true} />
          <BehindTheNumbersEmp />
          <a name="tc" />
          <br />
          <br />
          <BreakBefore shouldBreak={true} />
          {intl.locale === 'zh' && (
            <a
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#sc`}
              style={{ textDecoration: 'none' }}
            >
              <Text as="h2" fontWeight={600} color="secondary">
                (<FormattedMessage {...rootMessages.BehindTheNumbers.header} />)
              </Text>
            </a>
          )}
          <Text as="h2" fontWeight={600}>
            <FormattedMessage {...rootMessages.BehindTheNumbers.tc.header} />
          </Text>
          <BehindTheNumbersQolTC />
          <br />
          <BreakBefore shouldBreak={true} />
          <BehindTheNumbersSfsTC />
          <br />
          <BreakBefore shouldBreak={true} />
          <BehindTheNumbersEmpTC />
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabCountryBehindTheNumbers.propTypes = {};

export default injectIntl(TabCountryBehindTheNumbers);
