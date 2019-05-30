import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Paragraph, Heading } from 'grommet';

import messages from './messages';

const Styled = styled.div``;

function HTRBulletCPR({ contxt, dimension }) {
  console.log(dimension);
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.bullet.intro} />
      </Paragraph>
      <Heading level={4}>
        <FormattedMessage {...messages.bullet.rangeTitle} />
      </Heading>
      <Paragraph>
        <FormattedMessage {...messages.bullet.longBars} />
      </Paragraph>
      <Paragraph>
        <FormattedMessage {...messages.bullet.shortBars} />
      </Paragraph>
      {contxt !== 'narrative' && (
        <Paragraph>
          <FormattedMessage {...messages.bullet.countryComparison} />
        </Paragraph>
      )}
    </Styled>
  );
}

HTRBulletCPR.propTypes = {
  contxt: PropTypes.string,
  dimension: PropTypes.string,
};

export default HTRBulletCPR;
