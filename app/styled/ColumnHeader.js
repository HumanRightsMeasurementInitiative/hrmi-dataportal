import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  border-bottom: ${props => props.theme.columnHeader.border};
`;

function ColumnHeader(props) {
  return (
    <Styled
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
