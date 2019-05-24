import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';
import DimensionTooltip from 'containers/Settings/DimensionTooltip';

import rootMessages from 'messages';

const DimensionHeading = props => (
  <Heading level={5} margin={{ vertical: 'none' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;

function DimensionTitle({ dimensionKey }) {
  return (
    <Box direction="row" align="center" pad={{ vertical: 'xsmall' }}>
      <StyledDimensionHeading>
        <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
      </StyledDimensionHeading>
      <DimensionTooltip dimensionKey={dimensionKey} />
    </Box>
  );
}

DimensionTitle.propTypes = {
  dimensionKey: PropTypes.string,
};

export default DimensionTitle;
