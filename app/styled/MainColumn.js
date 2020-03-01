import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  position: relative;
  min-height: 100vh;
  padding-right: ${({ hasAside }) => (hasAside ? '40px' : 0)};
`;

function MainColumn(props) {
  return <Styled direction="column" {...props} flex />;
}

MainColumn.propTypes = {
  hasAside: PropTypes.bool,
};

export default MainColumn;
