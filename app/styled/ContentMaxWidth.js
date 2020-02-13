import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme, maxWidth }) => maxWidth || theme.maxWidth || '1600px'};
  position: relative;
  min-height: auto;
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.large};
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
