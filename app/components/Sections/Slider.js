/**
 *
 * Overview
 *
 */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { reduce } from 'lodash/collection';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { isMaxSize, isMinSize } from 'utils/responsive';

import { BREAKPOINTS, CARD_WIDTH } from 'theme';

import SliderControls from './SliderControls';

// prettier-ignore
const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 0 -${({ theme, edge }) => (edge && theme.global.edgeSize[edge]) || 0};
  width: calc(
    100% +
      ${({ theme, edge }) => {
    if (edge && theme.global.edgeSize[edge]) {
      const value = parseInt(theme.global.edgeSize[edge].split('px')[0], 10);
      return value * 2;
    }
    return 0;
  }}px);
`;
const getCardNumber = width => {
  const minCards = Math.floor(width / CARD_WIDTH.min);
  const maxCards = Math.floor(width / CARD_WIDTH.max);
  return minCards > maxCards ? minCards : maxCards;
};

export function Slider({ stretch, children, cardMargin, ...rest }) {
  const ref = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const handleResize = () =>
    setCarouselWidth(ref.current ? ref.current.offsetWidth : 0);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  const cardNumber = carouselWidth ? getCardNumber(carouselWidth) : 1;
  // prettier-ignore
  const responsive = reduce(BREAKPOINTS, (m, bp, key) => ({
    ...m,
    [key]: {
      breakpoint: bp,
      items: stretch && cardNumber > children.length
        ? children.length
        : cardNumber,
      partialVisibilityGutter: cardNumber < children.length ? 20 : 0,
    },
  }), {});

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SliderWrapper ref={ref} edge={cardMargin}>
          {carouselWidth > 0 && (
            <Carousel
              containerClass="react-multi-carousel-list__custom"
              responsive={responsive}
              keyBoardControl={false}
              slidesToSlide={cardNumber}
              arrows={false}
              customButtonGroup={
                isMinSize(size, 'medium') && <SliderControls />
              }
              removeArrowOnDeviceType={['small']}
              renderButtonGroupOutside
              partialVisible={isMaxSize(size, 'small')}
              {...rest}
            >
              {children}
            </Carousel>
          )}
        </SliderWrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}

Slider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stretch: PropTypes.bool,
  cardMargin: PropTypes.string,
};

export default Slider;
