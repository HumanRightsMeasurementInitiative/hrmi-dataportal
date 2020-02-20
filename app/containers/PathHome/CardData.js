/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import styled from 'styled-components';
import ButtonPlain from 'styled/ButtonPlain';

const Button = styled(ButtonPlain)`
  margin: 0 auto;
  @media (min-width: 520px) {
    margin: 0;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export function CardData({ onClick, no, title }) {
  return (
    <Box
      height={{ min: '200px' }}
      elevation="small"
      responsive={false}
      margin="medium"
      pad="small"
      background="white"
    >
      <Button onClick={onClick}>
        <div>{no}</div>
        <div>{title}</div>
      </Button>
    </Box>
  );
}

CardData.propTypes = {
  no: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardData;
