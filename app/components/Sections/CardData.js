/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Text, ResponsiveContext } from 'grommet';
import { isMaxSize, isMinSize } from 'utils/responsive';

const Number = styled(Text)``;
const Subject = styled(Text)``;
const Teaser = styled(Text)``;
// prettier-ignore
const StyledButton = styled(Button)`
  &:hover {
    color: ${({ theme, hoverColor }) =>
    theme.global.colors[hoverColor || 'metrics']};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

export function CardData({ onCardClick, no = 0, title, teaser, subject }) {
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
          <StyledButton onClick={onCardClick} fill plain hoverColor={subject}>
            <Box
              height={{ min: '200px' }}
              pad={{ horizontal: 'medium', top: 'ms', bottom: 'large' }}
            >
              <Number
                size={isMinSize(size, 'large') ? 'xxxlarge' : 'xxlarge'}
                weight={600}
              >
                {no}
              </Number>
              <Subject
                size={isMinSize(size, 'large') ? 'xxlarge' : 'xlarge'}
                weight={600}
                margin={{ bottom: 'large' }}
              >
                {title}
              </Subject>
              <Teaser size={isMinSize(size, 'large') ? 'large' : 'medium'}>
                {teaser}
              </Teaser>
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
  subject: PropTypes.string,
  onCardClick: PropTypes.func,
};

export default CardData;
