/**
 *
 * SliderControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Next, Previous } from 'grommet-icons';
import ButtonPlain from 'styled/ButtonPlain';

import styled from 'styled-components';

const ArrowWrapper = styled.div`
  position: absolute;
  top: -10px;
  bottom: -10px;
  transition: all 0.5s;
  z-index: 8;
  opacity: 1;
  left: ${({ right }) => (right ? 'auto' : '0')};
  right: ${({ left }) => (left ? 'auto' : '0')};
  pointer-events: all;
  width: 0px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    width: 9999px;
    left: ${({ right }) => (right ? '100%' : 'auto')};
    right: ${({ left }) => (left ? '100%' : 'auto')};
  }
`;

// prettier-ignore
const ArrowWrapperFull = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8;
  opacity: 1;
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: block;
    left: ${({ right, theme }) => (right ? theme.global.edgeSize.xxlarge : '0')};
    right: ${({ left, theme }) => (left ? theme.global.edgeSize.xxlarge : '0')};
    background: rgb(255, 255, 255);
  }
`;

// prettier-ignore
const StyledButtonIcon = styled(ButtonPlain)`
  pointer-events: all;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ right }) => (right ? '-30px' : 'auto')};
  right: ${({ left }) => (left ? '-30px' : 'auto')};
  width: 30px;
  text-align: ${({ left }) => (left ? 'right' : 'left')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    left: ${({ right }) => (right ? 0 : 'auto')};
    right: ${({ left }) => (left ? 0 : 'auto')};
    width: ${({ theme }) => theme.global.edgeSize.xxlarge};
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, ${({ right }) => (right ? 0.5 : 1)}) 0%,
      rgba(255, 255, 255, ${({ right }) => (right ? 1 : 0.5)}) 100%
    );
    &:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, ${({ right }) => (right ? 0.75 : 1)}) 0%,
        rgba(255, 255, 255, ${({ right }) => (right ? 1 : 0.75)}) 100%
      );
    }
  }
`;

const SliderControlsWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
`;

const SliderControls = ({ next, previous, carouselState }) => {
  const hasRight =
    carouselState.currentSlide + carouselState.slidesToShow <
    carouselState.totalItems;
  const hasLeft = carouselState.currentSlide > 0;
  return (
    <SliderControlsWrapper>
      {hasLeft && (
        <ArrowWrapper left>
          <ArrowWrapperFull left />
          <StyledButtonIcon left onClick={previous} subtle>
            <Previous size="xxlarge" color="dark" />
          </StyledButtonIcon>
        </ArrowWrapper>
      )}
      {hasRight && (
        <ArrowWrapper right>
          <ArrowWrapperFull right />
          <StyledButtonIcon right onClick={next} subtle>
            <Next size="xxlarge" color="dark" />
          </StyledButtonIcon>
        </ArrowWrapper>
      )}
    </SliderControlsWrapper>
  );
};

SliderControls.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  carouselState: PropTypes.object,
};

export default SliderControls;
