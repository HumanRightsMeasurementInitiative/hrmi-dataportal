/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  max-height: ${({ type }) => (type === 'icon' ? 140 : 120)}px;
  padding-top: ${({ type, theme }) =>
    type === 'icon' ? theme.global.edgeSize.small : 0};
`;
// prettier-ignore
const StyledButton = styled(Button)`
  &:hover {
    color: ${({ theme, activeColor }) =>
    activeColor
      ? theme.global.colors[activeColor]
      : theme.global.colors.metrics};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
const Banner = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.global.colors.countriesLightRGBA};
  color: ${({ theme }) => theme.global.colors.black};
  padding: ${({ theme }) => theme.global.edgeSize.hair}
    ${({ theme }) => theme.global.edgeSize.xsmall};
  &:hover {
    background: ${({ theme }) => theme.global.colors.countriesLight};
  }
`;
export function Card({
  imageSrc,
  margin,
  onCardClick,
  label,
  superLabel,
  activeColor,
  minHeight,
  banner,
  type,
  ...rest
}) {
  let textHeight = 0;
  if (minHeight) {
    textHeight = superLabel ? 70 : 45;
  }
  return (
    <Box
      elevation="medium"
      responsive={false}
      margin={margin || 'xsmall'}
      pad="none"
      align="start"
      background="white"
      style={{ position: 'relative' }}
      {...rest}
    >
      <StyledButton onClick={onCardClick} fill plain activeColor={activeColor}>
        <Box>
          {imageSrc && <Image src={imageSrc} alt={label} type={type} />}
        </Box>
        <Box
          height={{ min: `${textHeight}px` }}
          margin={{
            top: 'xsmall',
            bottom: 'small',
          }}
          pad={{
            horizontal: 'small',
          }}
        >
          {superLabel && (
            <div>
              <Text size="xsmall">{superLabel}</Text>
            </div>
          )}
          <div>
            <Text weight={600}>{label}</Text>
          </div>
        </Box>
      </StyledButton>
      {banner && (
        <Banner
          pad="small"
          plain
          label={banner.label}
          onClick={banner.onClick}
        />
      )}
    </Box>
  );
}

Card.propTypes = {
  banner: PropTypes.object,
  onCardClick: PropTypes.func,
  margin: PropTypes.string,
  imageSrc: PropTypes.string,
  label: PropTypes.string,
  superLabel: PropTypes.string,
  activeColor: PropTypes.string,
  minHeight: PropTypes.bool,
  type: PropTypes.string,
};

export default Card;
