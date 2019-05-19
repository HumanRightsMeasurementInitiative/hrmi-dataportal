import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';

import rootMessages from 'messages';

import BarMultipleHorizontal from 'components/BarMultipleHorizontal';

const BarWrap = props => <Box direction="row" {...props} align="center" />;

const DimensionHeading = props => (
  <Heading level={5} margin={{ vertical: '5px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;

function RightsChart({
  dimensionKey,
  column,
  maxValue,
  data,
  unit = '',
  standard,
}) {
  return (
    <Box>
      <StyledDimensionHeading>
        <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
      </StyledDimensionHeading>
      <BarWrap>
        <BarMultipleHorizontal
          color={dimensionKey}
          minValue={0}
          maxValue={maxValue}
          unit={unit}
          data={data}
          column={column}
          stripes={dimensionKey === 'esr' && standard === 'hi'}
        />
      </BarWrap>
    </Box>
  );
}

RightsChart.propTypes = {
  dimensionKey: PropTypes.string,
  column: PropTypes.string,
  scale: PropTypes.string,
  standard: PropTypes.string,
  unit: PropTypes.string,
  maxValue: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default RightsChart;
