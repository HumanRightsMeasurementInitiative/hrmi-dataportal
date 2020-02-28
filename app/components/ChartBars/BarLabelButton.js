import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'styled/Button';

// prettier-ignore
const Styled = styled(Button)`
  text-align: left;
  padding: 2px 0 2px 0;
  line-height: 14px;
  min-height: ${({ allowWordBreak }) => allowWordBreak ? 26 : 20}px;
  font-size: 12px;
  color: ${({ color, theme }) => color
    ? theme.global.colors[color]
    : theme.global.colors['dark-1']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 0 2px 0;
    min-height: ${({ allowWordBreak }) => allowWordBreak ? 40 : 20}px;
    line-height: 19px;
    font-size: 14px;
  }
`;

function BarLabelButton({ label, onClick, allowWordBreak, color }) {
  return (
    <Styled
      allowWordBreak={allowWordBreak}
      onClick={() => onClick()}
      color={color}
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
};

export default BarLabelButton;
