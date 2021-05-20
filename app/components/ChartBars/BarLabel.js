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
    font-size: 12px;
    line-height: 16px;
  }
`;

function BarLabel({ label, year, allowWordBreak, color, level }) {
  return (
    <Styled allowWordBreak={allowWordBreak} color={color} level={level}>
      {year ? `${label} (${year})` : label}
    </Styled>
  );
}

BarLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  year: PropTypes.string,
  color: PropTypes.string,
  allowWordBreak: PropTypes.bool,
  level: PropTypes.number,
};

export default BarLabel;
