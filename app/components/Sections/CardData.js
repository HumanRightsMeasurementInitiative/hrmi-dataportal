/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, Paragraph, ResponsiveContext } from 'grommet';
import { isMaxSize, isMinSize } from 'utils/responsive';

import ButtonTextIcon from 'styled/ButtonTextIcon';

const Number = styled(Text)``;
const Subject = styled(Text)``;
const Teaser = styled(Paragraph)``;
// prettier-ignore

export function CardData({ onClick, no = 0, title, teaser, anchor }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          elevation="medium"
          responsive={false}
          margin={{
            horizontal: isMaxSize(size, 'small') ? 'xsmall' : 'small',
          }}
          height={{ min: '200px' }}
          pad={{ horizontal: 'medium', top: 'ms', bottom: 'medium' }}
          background="white"
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
            margin={{ bottom: 'small' }}
          >
            {title}
          </Subject>
          <Teaser size={isMinSize(size, 'large') ? 'large' : 'medium'}>
            {teaser}
          </Teaser>
          <ButtonTextIcon onClick={() => onClick()} hasIcon label={anchor} size="large" />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardData.propTypes = {
  no: PropTypes.number,
  title: PropTypes.string,
  teaser: PropTypes.string,
  anchor: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardData;
