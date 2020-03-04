import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import NavOption from './NavOption';

const NavOptionWrap = styled(Box)`
  padding-top: 10px;
  padding-bottom: 30px;
`;

export function NavOptionGroup({ label, options, onClick, subject }) {
  return (
    <NavOptionWrap>
      {label && (
        <Text color="dark-4" size="small" pad={{ bottom: '2px' }}>
          {label}
        </Text>
      )}
      {options.map(m => (
        <NavOption
          key={m.code}
          onClick={() => onClick(m.code)}
          special={m.special}
        >
          <Box direction="row" align="end" fill="horizontal" width="100%">
            <Text color={subject}>{m.label}</Text>
          </Box>
        </NavOption>
      ))}
    </NavOptionWrap>
  );
}

NavOptionGroup.propTypes = {
  label: PropTypes.string,
  subject: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
};

export default NavOptionGroup;
