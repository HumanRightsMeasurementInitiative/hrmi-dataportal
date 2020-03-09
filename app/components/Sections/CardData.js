/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Text, ResponsiveContext } from 'grommet';
import { isMaxSize } from 'utils/responsive';

const Number = styled(Text)``;
const Subject = styled(Text)``;
const Teaser = styled(Text)``;
const StyledButton = styled(Button)`
  &:hover {
    color: ${({ theme }) => theme.global.colors.metrics};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

export function CardData({ onCardClick, no = 0, title, teaser }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          elevation="medium"
          responsive={false}
          margin={{
            horizontal: isMaxSize(size, 'small') ? 'xsmall' : 'small',
          }}
          pad="none"
          background="white"
        >
          <StyledButton onClick={onCardClick} fill plain>
            <Box
              height={{ min: '200px' }}
              pad={{ horizontal: 'medium', top: 'ms', bottom: 'large' }}
            >
              <Number size="xxxlarge" weight={600}>
                {no}
              </Number>
              <Subject size="xlarge" weight={600} margin={{ bottom: 'large' }}>
                {title}
              </Subject>
              <Teaser size="medium">{teaser}</Teaser>
            </Box>
          </StyledButton>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardData.propTypes = {
  no: PropTypes.number,
  title: PropTypes.string,
  teaser: PropTypes.string,
  onCardClick: PropTypes.func,
};

export default CardData;
