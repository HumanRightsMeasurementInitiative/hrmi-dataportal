/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

export function Card({ children, margin, onCardClick, ...rest }) {
  return (
    <Box
      elevation="small"
      responsive={false}
      margin={margin || 'xsmall'}
      pad="none"
      align="start"
      {...rest}
    >
      <Button onClick={onCardClick} fill plain>
        <Box height={{ min: '150px' }} pad="small">
          {children}
        </Box>
      </Button>
    </Box>
  );
}

Card.propTypes = {
  onCardClick: PropTypes.func,
  margin: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Card;
