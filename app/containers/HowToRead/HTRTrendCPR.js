import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading } from 'grommet';

import HTRParagraph from './HTRParagraph';

import messages from './messages';

const Styled = styled.div``;

// function HTRTrendCPR({ dimension }) {
function HTRTrendCPR() {
  return (
    <Styled>
      <HTRParagraph>
        <FormattedMessage {...messages.trendCPR.intro} />
      </HTRParagraph>
      <Heading responsive={false} level={4}>
        <FormattedMessage {...messages.trendCPR.rangeTitle} />
      </Heading>
      <HTRParagraph>
        <FormattedMessage {...messages.trendCPR.largeRange} />
      </HTRParagraph>
      <HTRParagraph>
        <FormattedMessage {...messages.trendCPR.smallRange} />
      </HTRParagraph>
    </Styled>
  );
}

HTRTrendCPR.propTypes = {
  dimension: PropTypes.string,
};

export default HTRTrendCPR;
