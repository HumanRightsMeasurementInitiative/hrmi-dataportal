/**
 *
 * SliderControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Next, Previous } from 'grommet-icons';
import ButtonIcon from 'styled/ButtonIcon';

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
`;
const ArrowWrapperGradient = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 8;
  opacity: 1;
  left: ${({ right }) => (right ? '0' : 'auto')};
  right: ${({ left }) => (left ? '0' : 'auto')};
  width: ${({ theme }) => theme.global.edgeSize.xxlarge};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, ${({ right }) => (right ? 0.5 : 1)}) 0%,
      rgba(255, 255, 255, ${({ right }) => (right ? 1 : 0.5)}) 100%
    );
  }
`;
const ArrowWrapperFull = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 8;
  opacity: 1;
  left: ${({ right, theme }) => (right ? theme.global.edgeSize.xxlarge : '0')};
  right: ${({ left, theme }) => (left ? theme.global.edgeSize.xxlarge : '0')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    background: rgb(255, 255, 255);
  }
`;

// prettier-ignore
const StyledButtonIcon = styled(ButtonIcon)`
  pointer-events: all;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
  }
  left: ${({ left }) => (left ? '100%' : 'auto')};
  right: ${({ right }) => (right ? '100%' : 'auto')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    left: ${({ right }) => (right ? '3px' : 'auto')};
    right: ${({ left }) => (left ? '3px' : 'auto')};
  }
`;

const SliderControlsWrapper = styled.div`
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
          <ArrowWrapperGradient left>
            <StyledButtonIcon left onClick={previous} subtle>
              <Previous size="xlarge" color="black" />
            </StyledButtonIcon>
          </ArrowWrapperGradient>
        </ArrowWrapper>
      )}
      {hasRight && (
        <ArrowWrapper right>
          <ArrowWrapperFull right />
          <ArrowWrapperGradient right>
            <StyledButtonIcon right onClick={next} subtle>
              <Next size="xlarge" color="black" />
            </StyledButtonIcon>
          </ArrowWrapperGradient>
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
