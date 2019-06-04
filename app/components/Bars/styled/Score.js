import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
import formatScore from 'utils/format-score';

const getRotation = rotation => `rotate(${rotation}deg)`;

const Styled = styled.div`
  position: absolute;
  top: ${({ direction }) => (direction === 'top' ? 'auto' : '100%')};
  bottom: ${({ direction, rotate }) => {
    if (direction !== 'top') return 'auto';
    if (rotate) return '100%';
    return '100%';
  }};
  font-weight: ${({ secondary }) => (secondary ? 400 : 700)};
  transform: ${({ align, rotate }) => {
    if (rotate) return getRotation(rotate);
    if (align === 'left') return '';
    if (align === 'right') return 'translateX(-100%)';
    return 'translateX(-50%)';
  }};
  margin-top: ${({ direction }) => (direction === 'top' ? 'auto' : '2px')};
  margin-bottom: ${({ direction, level, rotate }) => {
    if (direction !== 'top') {
      return 'auto';
    }
    if (rotate) {
      return 'auto';
    }
    return level === 1 ? '4px' : '2px';
  }};
  margin-left: ${({ rotate }) => (rotate ? '5px' : 0)};
  display: table;
  z-index: ${({ rotate }) => (rotate ? 10 : 0)};
  transform-origin: bottom left;
`;

const getSize = level => {
  if (level > 2) return 'xsmall';
  if (level === 2) return 'small';
  return 'medium';
};

function Score({
  score,
  left,
  color,
  unit = '',
  level,
  direction = 'bottom',
  secondary = false,
  align,
  rotate,
  title,
}) {
  return (
    <Styled
      style={{ left: `${rotate ? 100 : left}%` }}
      direction={direction}
      secondary={secondary}
      align={align}
      rotate={rotate}
    >
      <Box
        elevation="small"
        pad={{ horizontal: 'xsmall', vertical: 'hair' }}
        background="white"
        round="xxsmall"
      >
        {title && (
          <Text
            color={`${color}Dark`}
            size={score ? 'xsmall' : getSize(level)}
            style={{ fontWeight: score || level > 1 ? 400 : 600 }}
          >
            {title}
          </Text>
        )}
        {score && (
          <Text color={`${color}Dark`} size={getSize(level)}>
            {score && `${formatScore(score)}${unit}`}
          </Text>
        )}
      </Box>
    </Styled>
  );
}

Score.propTypes = {
  score: PropTypes.number,
  left: PropTypes.number,
  secondary: PropTypes.bool,
  color: PropTypes.string,
  unit: PropTypes.string,
  align: PropTypes.string,
  title: PropTypes.string,
  level: PropTypes.number,
  rotate: PropTypes.number,
  direction: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Score;
