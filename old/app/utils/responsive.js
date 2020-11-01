import { BREAKPOINTS, SIZES } from 'theme';

// if a given size is larger than a reference size
const isMinXXLarge = size => size === 'xxlarge';
const isMinXLarge = size => isMinXXLarge(size) || size === 'xlarge';
const isMinLarge = size => isMinXLarge(size) || size === 'large';
const isMinMedium = size => isMinLarge(size) || size === 'medium';
const isMinSM = size => isMinMedium(size) || size === 'sm';
const isMinSmall = () => true;

export const isMinSize = (currentSize, checkSize) => {
  if (checkSize === 'small') return isMinSmall(currentSize);
  if (checkSize === 'sm') return isMinSM(currentSize);
  if (checkSize === 'medium') return isMinMedium(currentSize);
  if (checkSize === 'large') return isMinLarge(currentSize);
  if (checkSize === 'xlarge') return isMinXLarge(currentSize);
  if (checkSize === 'xxlarge') return isMinXXLarge(currentSize);
  return false;
};

// If a given size is smaller than a reference size
const isMaxXXLarge = () => true;
const isMaxXLarge = size => isMaxLarge(size) || size === 'xlarge';
const isMaxLarge = size => isMaxMedium(size) || size === 'large';
const isMaxMedium = size => isMaxSM(size) || size === 'medium';
const isMaxSM = size => isMaxSmall(size) || size === 'sm';
const isMaxSmall = size => size === 'small';

export const isMaxSize = (currentSize, checkSize) => {
  if (checkSize === 'small') return isMaxSmall(currentSize);
  if (checkSize === 'sm') return isMaxSM(currentSize);
  if (checkSize === 'medium') return isMaxMedium(currentSize);
  if (checkSize === 'large') return isMaxLarge(currentSize);
  if (checkSize === 'xlarge') return isMaxXLarge(currentSize);
  if (checkSize === 'xxlarge') return isMaxXXLarge(currentSize);
  return false;
};

export const getAsideWidth = currentSize => {
  if (isMinSize(currentSize, 'xxlarge'))
    return `${SIZES.aside.width[BREAKPOINTS.xxlarge.index]}px`;
  if (isMinSize(currentSize, 'xlarge'))
    return `${SIZES.aside.width[BREAKPOINTS.xlarge.index]}px`;
  return `${SIZES.aside.width[BREAKPOINTS.large.index]}px`;
};

export const getWindowDimensions = () => {
  // const { innerWidth: width, innerHeight: height } = window;
  if (document.compatMode === 'BackCompat') {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };
  }
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
};

export const getFloatingAsideWidth = (size, theme, { width }) => {
  const asideWidth = parseInt(getAsideWidth(size), 10);
  const maxWidth = parseInt(theme.sizes.containerMaxWidth, 10);
  return asideWidth + Math.max(0, (width - maxWidth) / 2);
};

export const getHeaderHeight = (size, theme) =>
  isMinSize(size, 'medium')
    ? theme.sizes.header.height
    : theme.sizes.header.small.height;
export const getHeaderHeightTop = (size, theme) =>
  isMinSize(size, 'medium')
    ? theme.sizes.header.heightTop
    : theme.sizes.header.small.heightTop;
export const getHeaderHeightBottom = (size, theme) =>
  isMinSize(size, 'medium')
    ? theme.sizes.header.heightBottom
    : theme.sizes.header.small.heightBottom;
