import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
import formatScore from 'utils/format-score';

const Styled = styled.div`
  position: absolute;
  top: 100%;
  font-weight: 700;
  transform: translateX(-50%);
  margin-top: 2px;
  display: table;
`;

const getSize = level => {
  if (level > 2) return 'xsmall';
  if (level === 2) return 'small';
  return 'medium';
};

function Score({ score, left, color, unit = '', level }) {
  return (
    <Styled style={{ left: `${left}%` }}>
      <Box
        elevation="small"
        pad={{ horizontal: 'xsmall', vertical: 'hair' }}
        background="white"
        round="xxsmall"
      >
        <Text color={`${color}Dark`} size={getSize(level)}>
          {score && `${formatScore(score)}${unit}`}
        </Text>
      </Box>
    </Styled>
  );
}

Score.propTypes = {
  score: PropTypes.number,
  left: PropTypes.number,
  color: PropTypes.string,
  unit: PropTypes.string,
  level: PropTypes.number,
};

export default Score;
