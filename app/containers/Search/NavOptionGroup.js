import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import NavOption from './NavOption';

const NavOptionWrap = styled(Box)`
  padding-top: 10px;
  padding-bottom: 30px;
`;
const StyledText = styled(Text)`
  padding-left: 10px;
  padding-right: 10px;
  bottom: 2px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export function NavOptionGroup({
  label,
  options,
  onClick,
  subject,
  activeResult,
  focus,
  onFocus,
}) {
  const myRefs = useRef([]);
  const onEnter = useCallback(
    event => {
      // on enter
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

  useEffect(() => {
    if (focus && myRefs && myRefs.current && myRefs.current[activeResult]) {
      myRefs.current[activeResult].focus();
    }
  }, [options, activeResult, focus]);
  return (
    <div>
      <NavOptionWrap>
        {label && (
          <StyledText color="dark-4" size="small">
            {label}
          </StyledText>
        )}
        {options.map((m, index) => (
          <NavOption
            key={m.code}
            onClick={() => onClick(m.code)}
            special={m.special}
            ref={el => {
              myRefs.current[index] = el;
            }}
            onFocus={() => onFocus && onFocus(index)}
            active={index === activeResult}
          >
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
  onFocus: PropTypes.func,
  activeResult: PropTypes.number,
  focus: PropTypes.bool,
};

export default NavOptionGroup;
