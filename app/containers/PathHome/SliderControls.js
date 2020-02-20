/**
 *
 * SliderControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Next, Previous } from 'grommet-icons';

import styled from 'styled-components';

const ArrowWrapper = styled.button`
  position: absolute;
  outline: 0;
  transition: all 0.5s;
  border-radius: 35px;
  z-index: 8;
  border: 0;
  min-width: 46px;
  min-height: 46px;
  opacity: 1;
  cursor: pointer;
  background: ${({ theme }) => theme.global.colors.highlight};
  left: ${({ left }) => (left ? 0 : 'auto')};
  right: ${({ right }) => (right ? 0 : 'auto')};
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    left: ${({ right }) => (right ? '100%' : 'auto')};
    right: ${({ left }) => (left ? '100%' : 'auto')};
  }
`;

const SliderControlsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
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
        <ArrowWrapper left onClick={previous}>
          <Previous />
        </ArrowWrapper>
      )}
      {hasRight && (
        <ArrowWrapper right onClick={next}>
          <Next />
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
