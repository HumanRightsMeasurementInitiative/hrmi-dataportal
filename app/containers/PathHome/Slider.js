/**
 *
 * Overview
 *
 */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styled from 'styled-components';
import { reduce } from 'lodash/collection';

import { BREAKPOINTS, CARD_WIDTH } from 'theme';

import SliderControls from './SliderControls';

const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  min-height: 150px;
`;
const getCardNumber = width => {
  const minCards = Math.floor(width / CARD_WIDTH.min);
  const maxCards = Math.floor(width / CARD_WIDTH.max);
  return minCards > maxCards ? minCards : maxCards;
};

export function Slider(props) {
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
  const { children } = props;
  const cardNumber = carouselWidth ? getCardNumber(carouselWidth) : 1;
  // prettier-ignore
  const responsive = reduce(BREAKPOINTS, (m, bp, key) => ({
    ...m,
    [key]: {
      breakpoint: bp,
      items: cardNumber,
    },
  }), {});

  return (
    <SliderWrapper ref={ref}>
      {carouselWidth > 0 && (
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={['small', 'medium']}
          keyBoardControl={false}
          slidesToSlide={cardNumber}
          arrows={false}
          customButtonGroup={<SliderControls />}
          renderButtonGroupOutside
          {...props}
        >
          {children}
        </Carousel>
      )}
    </SliderWrapper>
  );
}

Slider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Slider;
