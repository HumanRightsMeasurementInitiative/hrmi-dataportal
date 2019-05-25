import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

import BarMultipleHorizontal from 'components/BarMultipleHorizontal';

const HEIGHT = 100;
const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)
const Styled = styled.div`
  height: ${heightRotated}px;
  padding-top: ${(heightRotated - HEIGHT) / 2}px;
`;
const BarWrap = props => (
  <Box direction="row" {...props} align="center" alignSelf="center" />
);
const BarWrapRotated = styled(BarWrap)`
  display: block;
  width: ${HEIGHT}px;
  margin: 0 auto;
  transform: rotate(-45deg);
`;

export function DiamondChart({ dimensions, rights, refColumns }) {
  if (!dimensions && !rights) return null;

  return (
    <Styled>
      <BarWrapRotated>
        {dimensions && (
          <BarMultipleHorizontal
            omitMinMaxLabels
            minValue={0}
            data={dimensions}
            level={0}
            height={HEIGHT}
            noPadding
            refData={refColumns}
          />
        )}
        {rights && (
          <BarMultipleHorizontal
            omitMinMaxLabels
            minValue={0}
            data={rights}
            level={0}
            refData={refColumns}
          />
        )}
      </BarWrapRotated>
    </Styled>
  );
}

DiamondChart.propTypes = {
  rights: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dimensions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  refColumns: PropTypes.array,
};

export default DiamondChart;
