/**
 *
 * SliderControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Next, Previous } from 'grommet-icons';
import Button from 'styled/Button';

import styled from 'styled-components';

const ArrowWrapper = styled.div`
  position: absolute;
  top: -10px;
  bottom: -10px;
  transition: all 0.5s;
  z-index: 8;
  opacity: 1;
  left: ${({ right }) => (right ? '100%' : 'auto')};
  right: ${({ left }) => (left ? '100%' : 'auto')};
  width: 9999px;
  pointer-events: all;
`;

const ArrowWrapperFull = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8;
  opacity: 1;
  left: ${({ right, theme }) => (right ? theme.global.edgeSize.xxlarge : '0')};
  right: ${({ left, theme }) => (left ? theme.global.edgeSize.xxlarge : '0')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    background: rgb(255, 255, 255);
  }
`;

// prettier-ignore
const StyledButtonIcon = styled(Button)`
  pointer-events: all;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ right }) => (right ? 0 : 'auto')};
  right: ${({ left }) => (left ? 0 : 'auto')};
  width: ${({ theme }) => theme.global.edgeSize.xxlarge};
  text-align: ${({ left }) => (left ? 'right' : 'left')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
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
            <Previous size="xlarge" color="black" />
          </StyledButtonIcon>
        </ArrowWrapper>
      )}
      {hasRight && (
        <ArrowWrapper right>
          <ArrowWrapperFull right />
          <StyledButtonIcon right onClick={next} subtle>
            <Next size="xlarge" color="black" />
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
