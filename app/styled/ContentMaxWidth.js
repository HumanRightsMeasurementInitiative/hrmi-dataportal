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
  max-width: ${({ theme }) => `${theme.sizes.containerMaxWidth}px` || '1600px'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-left: ${({ theme }) => theme.global.edgeSize.medium};
    padding-right: ${({ theme }) => theme.global.edgeSize.medium};
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
