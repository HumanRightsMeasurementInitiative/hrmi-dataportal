import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'styled/Button';

// prettier-ignore
const Styled = styled(Button)`
  text-align: left;
  padding: 2px 0 2px 0;
  line-height: 14px;
  min-height: 20px;
  font-size: ${({ level }) => (level > 1 ? '12px' : '14px' )};
  color: ${({ color, theme }) => color
    ? theme.global.colors[color]
    : theme.global.colors['dark-1']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 0 2px 0;
    min-height: 20px;
    line-height: 19px;
    font-size: ${({ level }) => (level > 1 ? '14px' : '16px' )};
  }
`;

function BarLabelButton({ label, onClick, allowWordBreak, color, level }) {
  return (
    <Styled
      allowWordBreak={allowWordBreak}
      onClick={() => onClick()}
      color={color}
      level={level}
    >
      {label}
    </Styled>
  );
}

BarLabelButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  allowWordBreak: PropTypes.bool,
  level: PropTypes.number,
};

export default BarLabelButton;
