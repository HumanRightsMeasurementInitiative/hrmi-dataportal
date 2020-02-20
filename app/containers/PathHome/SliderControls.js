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
  left: ${({ right }) => (right ? '100%' : 'auto')};
  right: ${({ left }) => (left ? '100%' : 'auto')};
  outline: 0;
  transition: all 0.5s;
  border-radius: 35px;
  z-index: 1000;
  border: 0;
  min-width: 43px;
  min-height: 43px;
  opacity: 1;
  cursor: pointer;
`;

const SliderControlsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  top: 50%;
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
