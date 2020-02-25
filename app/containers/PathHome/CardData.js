/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from 'grommet';

export function CardData({ onCardClick, no, title, margin }) {
  return (
    <Box
      elevation="small"
      responsive={false}
      margin={margin || 'medium'}
      pad="none"
      background="white"
    >
      <Button onClick={onCardClick} fill plain>
        <Box height={{ min: '200px' }} pad="small">
          <div>{no}</div>
          <div>{title}</div>
        </Box>
      </Button>
    </Box>
  );
}

CardData.propTypes = {
  no: PropTypes.number,
  title: PropTypes.string,
  onCardClick: PropTypes.func,
  margin: PropTypes.string,
};

export default CardData;
