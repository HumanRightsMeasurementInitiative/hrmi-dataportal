import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// prettier-ignore
const Styled = styled.span`
  text-align: left;
  padding: 2px 0 2px 0;
  line-height: 14px;
  min-height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ color, theme }) => color
    ? theme.global.colors[color]
    : theme.global.colors['dark-1']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 0 2px 0;
    min-height: 20px;
    line-height: 19px;
    font-size: ${({ level }) => (level > 1 ? '14px' : '16px')};
  }
  @media print {
    font-size: 15px;
    line-height: 20px;
  }
`;

function BarLabel({ label, allowWordBreak, color, level }) {
  return (
    <Styled allowWordBreak={allowWordBreak} color={color} level={level}>
      {label}
    </Styled>
  );
}

BarLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
  allowWordBreak: PropTypes.bool,
  level: PropTypes.number,
};

export default BarLabel;
