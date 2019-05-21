import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import NavOption from './NavOption';

const NavOptionWrap = styled(Box)`
  padding-top: 10px;
  padding-bottom: 30px;
`;

export function NavOptionGroup({ label, options, onClick }) {
  return (
    <NavOptionWrap>
      {label && (
        <Text color="dark-4" size="small">
          {label}
        </Text>
      )}
      {options.map(m => (
        <NavOption key={m.code} onClick={() => onClick(m.code)}>
          <Box direction="row" align="end" fill="horizontal" width="100%">
            <Text>{m.label}</Text>
            {m.labelSecondary && (
              <Box margin={{ left: 'auto' }}>
                <Text color="dark-4" size="xsmall">
                  {m.labelSecondary}
                </Text>
              </Box>
            )}
          </Box>
        </NavOption>
      ))}
    </NavOptionWrap>
  );
}

NavOptionGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
};

export default NavOptionGroup;
