import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Paragraph, Heading } from 'grommet';

import messages from './messages';

const Styled = styled.div``;

// function HTRTrendCPR({ dimension }) {
function HTRTrendCPR() {
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.trendCPR.intro} />
      </Paragraph>
      <Heading level={4}>
        <FormattedMessage {...messages.trendCPR.rangeTitle} />
      </Heading>
      <Paragraph>
        <FormattedMessage {...messages.trendCPR.largeRange} />
      </Paragraph>
      <Paragraph>
        <FormattedMessage {...messages.trendCPR.smallRange} />
      </Paragraph>
    </Styled>
  );
}

HTRTrendCPR.propTypes = {
  dimension: PropTypes.string,
};

export default HTRTrendCPR;
