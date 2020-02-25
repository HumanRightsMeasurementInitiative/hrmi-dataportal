import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

// prettier-ignore
const Styled = styled(Box)`
  margin: 0 auto;
  width: 100%;
  position: relative;
  min-height: auto;
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    max-width: ${({ theme, maxWidth }) => {
    if (maxWidth) {
      if (maxWidth === 'medium') return theme.maxWidthMedium;
      if (maxWidth === 'narrow') return theme.maxWidthNarrow;
      return maxWidth;
    }
    return theme.maxWidth || '1600px';
  }};
    padding: 0 ${({ theme }) => theme.global.edgeSize.xlarge};
  }
`;

export function ContentMaxWidth(props) {
  return (
    <Styled
      direction={props.column ? 'column' : 'row'}
      align={props.column ? 'start' : 'center'}
      {...props}
    />
  );
}

ContentMaxWidth.propTypes = {
  column: PropTypes.bool,
};

export default ContentMaxWidth;
