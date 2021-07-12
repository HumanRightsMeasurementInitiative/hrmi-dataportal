import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

// prettier-ignore
const Styled = styled(Box)`
  min-height: ${({ header }) => (header ? 0 : '100vh')};
  position: relative;
  padding-right: ${({ hasAside, theme }) =>
    hasAside ? theme.global.edgeSize.medium : 0};
  padding-bottom: ${props => (props.header ? '15px' : 0)};
  padding-top: ${({ header, hasLinks }) => {
    if (header && hasLinks) {
      return '20px';
    }
    if (header && !hasLinks) {
      return '30px';
    }
    return 0;
  }};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-bottom: ${props => (props.header ? '40px' : 0)};
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
  @media (min-width: ${({ theme }) => theme.breakpointsMin.xlarge}) {
    padding-right: ${({ hasAside, theme }) =>
    hasAside ? theme.global.edgeSize.large : 0};
  }
  @media print {
    padding-top: 15px;
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
