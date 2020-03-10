import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

// prettier-ignore
const Styled = styled(Box)`
  position: relative;
  min-height: ${({ header }) => (header ? 0 : '100vh')};
  padding-right: ${({ hasAside, theme }) =>
    hasAside ? theme.global.edgeSize.xlarge : 0};
  padding-bottom: ${props => (props.header ? '40px' : 0)};
  padding-top: ${({ header }) => {
    if (header) {
      return '10px';
    }
    return 0;
  }};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: ${props => (props.header ? '25px' : 0)};
    padding-top: ${({ header, hasLinks }) => {
    if (header && hasLinks) {
      return '25px';
    }
    if (header && !hasLinks) {
      return '45px';
    }
    return 0;
  }};
  }
`;

function MainColumn(props) {
  return <Styled direction="column" {...props} flex />;
}

MainColumn.propTypes = {
  hasAside: PropTypes.bool,
  header: PropTypes.bool,
};

export default MainColumn;
