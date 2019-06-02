import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const StyledBox = styled(Box)`
  border-bottom: 6px solid transparent;
`;

function ColumnHeader(props) {
  return (
    <StyledBox
      pad={{
        left: props.main ? 'medium' : 'xsmall',
      }}
      {...props}
    />
  );
}

ColumnHeader.propTypes = {
  main: PropTypes.bool,
};

export default ColumnHeader;
