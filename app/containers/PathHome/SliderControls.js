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
  top: 0;
  bottom: 0;
  transition: all 0.5s;
  z-index: 8;
  opacity: 1;
  left: ${({ right }) => (right ? '100%' : 'auto')};
  right: ${({ left }) => (left ? '100%' : 'auto')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    background: rgba(255, 255, 255, 0.7);
  }
  width: 9999px;
`;
// right: ${({ right }) => (right ? 0 : 'auto')};
// left: ${({ left }) => (left ? 0 : 'auto')};
// const IconWrapper = styled.button`
//   outline: 0;
//   border: 0;
//   cursor: pointer;
//   background: ${({ theme }) => theme.global.colors.highlight};
//   min-width: 46px;
//   min-height: 46px;
//   border-radius: 35px;
// `;

// prettier-ignore
const StyledButtonIcon = styled(ButtonIcon)`
  pointer-events: all;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme, subtle }) =>
    subtle ? 'transparent' : theme.global.colors.highlight};
  &:hover {
    background: ${({ theme, subtle }) =>
    theme.global.colors[subtle ? 'highlight' : 'highlight2']};
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
  pointer-events: none;
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
          <StyledButtonIcon left onClick={previous}>
            <Previous />
          </StyledButtonIcon>
        </ArrowWrapper>
      )}
      {hasRight && (
        <ArrowWrapper right>
          <StyledButtonIcon right onClick={next}>
            <Next />
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
