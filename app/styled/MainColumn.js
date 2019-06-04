import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  width: 100%;
  position: relative;
  min-height: 100vh;
  border-right: ${({ hasAside }) => (hasAside ? 1 : 0)}px solid;
  border-color: ${({ theme }) => theme.global.colors['light-3']};
`;

function MainColumn(props) {
  return (
    <Styled
      direction="column"
      pad={
        props.hasAside
          ? { right: 'medium', bottom: 'xlarge' }
          : { bottom: 'xlarge' }
      }
      {...props}
    />
  );
}

MainColumn.propTypes = {
  hasAside: PropTypes.bool,
};

export default MainColumn;
