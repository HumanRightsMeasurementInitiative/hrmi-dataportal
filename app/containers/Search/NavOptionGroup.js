import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import Active from 'components/ChartBars/styled/Active';

import NavOption from './NavOption';

const NavOptionWrap = styled(Box)`
  padding-top: 10px;
  padding-bottom: 30px;
`;

export function NavOptionGroup({
  label,
  options,
  onClick,
  subject,
  activeResult,
}) {
  const onEnter = useCallback(
    event => {
      if (event.keyCode === 13) {
        if (options[activeResult]) onClick(options[activeResult].code);
      }
    },
    [options, activeResult],
  );

  useEffect(() => {
    document.addEventListener('keydown', onEnter, false);

    return () => {
      document.removeEventListener('keydown', onEnter, false);
    };
  }, [options, activeResult]);
  return (
    <div>
      <NavOptionWrap>
        {label && (
          <Text color="dark-4" size="small" pad={{ bottom: '2px' }}>
            {label}
          </Text>
        )}
        {options.map((m, index) => (
          <NavOption
            key={m.code}
            onClick={() => onClick(m.code)}
            special={m.special}
          >
            {index === activeResult && <Active color="dark" />}
            <Box direction="row" align="end" fill="horizontal" width="100%">
              <Text color={subject}>{m.label}</Text>
            </Box>
          </NavOption>
        ))}
      </NavOptionWrap>
    </div>
  );
}

NavOptionGroup.propTypes = {
  label: PropTypes.string,
  subject: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
  activeResult: PropTypes.number,
};

export default NavOptionGroup;
