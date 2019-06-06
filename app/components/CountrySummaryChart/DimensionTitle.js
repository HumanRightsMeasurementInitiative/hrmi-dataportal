import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';
import DimensionTooltip from 'containers/Settings/DimensionTooltip';

import rootMessages from 'messages';

const DimensionHeading = props => (
  <Heading
    responsive={false}
    level={5}
    margin={{ vertical: 'none' }}
    {...props}
  />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;

function DimensionTitle({ dimensionKey }) {
  return (
    <Box direction="row" align="center" pad={{ vertical: 'xsmall' }}>
      <StyledDimensionHeading>
        {dimensionKey && (
          <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
        )}
        {!dimensionKey && <span>&nbsp;</span>}
      </StyledDimensionHeading>
      {dimensionKey && <DimensionTooltip dimensionKey={dimensionKey} />}
    </Box>
  );
}

DimensionTitle.propTypes = {
  dimensionKey: PropTypes.string,
};

export default DimensionTitle;
