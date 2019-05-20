import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// app constants
import { ICONS, ICON_SIZE } from 'theme';
// utils
import asArray from 'utils/as-array';

// own style
const SVG = styled(({ color, themeColor, sizes, size, ...rest }) => (
  <svg {...rest} />
))`
  fill: ${props => {
    if (props.color) return props.color;
    if (props.themeColor) return props.theme.colors[props.themeColor];
    return 'currentColor';
  }};
  position: relative;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  width: ${props =>
    props.sizes && props.sizes.width ? props.sizes.width : props.size || '1em'};
  height: ${props =>
    props.sizes && props.sizes.height
      ? props.sizes.height
      : props.size || '1em'};
`;
// fallback default size
const defaultSize = 38;
/**
 * SVG icon component that produces an inline SVG image if **compound paths** are defined in app constant `ICONS`.
 *
 * For each icon one or more SVG-paths are required and optionally also the viewport size (defaults to app constant `ICON_SIZE`)
 *
 * ```js
 * const ICONS = {
 *   name: {
 *     size: 38, // original icon size (viewBox)
 *     paths: ['s v g', 'p a t h s'],
 *   },
 *   singlePathIcon: {
 *     size: 38,
 *     path: 's v g p a t h', // single path
 *   },
 *   iconWithDefaultSize: {
 *     paths: ['s v g', 'p a t h s'], // omitting the size (defaults to 38px)
 *   },
 *   iconWithDefaultSizeAlt: ['s v g', 'p a t h s'], // omitting the size allows paths shorthand
 *   singlePathIconWithDefaultSize: 's v g p a t h', // omitting the size allows path shorthand
 * };
 * ```
 *
 * @return {Component} Icon component
 */
class Icon extends React.PureComponent {
  render() {
    const { name, title, color, size, iconSize, themeColor } = this.props;
    const icon = ICONS[name];
    if (icon) {
      const iSizeX = (icon.sizes && icon.sizes[0]) || icon.size || iconSize;
      const iSizeY = (icon.sizes && icon.sizes[1]) || icon.size || iconSize;
      const iconPaths = icon.paths || icon.path || icon;
      return (
        <SVG
          viewBox={`0 0 ${iSizeX} ${iSizeY}`}
          preserveAspectRatio="xMidYMid meet"
          sizes={{
            width: `${size || iSizeX}px`,
            height: `${size || iSizeY}px`,
          }}
          color={color}
          themeColor={themeColor}
          aria-hidden={title ? 'false' : 'true'}
          role={title ? 'img' : 'presentation'}
        >
          {title && <title>{title}</title>}
          <path
            d={asArray(iconPaths).reduce((memo, path) => `${memo}${path}`, '')}
          />
        </SVG>
      );
    }
    return null;
  }
}

Icon.propTypes = {
  /* the icon identifier, defaults to 'placeholder' */
  name: PropTypes.string,
  /* an optional title for non-presentational graphics, defaults to empty title */
  title: PropTypes.string,
  /* optional size of the original icon, better set in ICON constants, defaults to 38 */
  iconSize: PropTypes.number,
  /* the icon display size, defaults to original size */
  size: PropTypes.number,
  /* the icon fill color (code) */
  color: PropTypes.string,
  /* the icon fill color (as theme color name) */
  themeColor: PropTypes.string,
};

Icon.defaultProps = {
  name: 'placeholder',
  iconSize: ICON_SIZE || defaultSize,
};

export default Icon;
