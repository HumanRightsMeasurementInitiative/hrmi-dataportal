import { css } from 'styled-components';
// theme defining breakpoints, colors, sizes, grid gutters
// breakpoints:
// < 720px (45em): small (mobile)
// < 960px (60em): medium (tablet portrait)
// >= 961px (72em): large (tablet landscape, desktop)
const myBreakpoints = [720, 960, 1152];
// theme breakpoints
export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
};
const text = {
  xxlarge: { size: '30px', height: '36px', maxWidth: '700px' },
  xlarge: { size: '24px', height: '30px', maxWidth: '700px' },
  large: { size: '20px', height: '25px', maxWidth: '700px' },
  medium: { size: '16px', height: '22px', maxWidth: '700px' },
};
const theme = {
  // used for grommet
  text,
  paragraph: text,
  global: {
    font: {
      family: 'Source Sans Pro',
      height: '22px',
      size: '16px',
    },
    colors: {
      black: '#09052F',
      'blue-dark': '#3A5161',
      text: { light: '#3A5161' },
      'light-1': '#F2F3F4', // <<< lightest      empowerment: '#262064', // AA large
      'light-2': '#EFEFEF',
      'light-3': '#E8EAE9',
      'light-4': '#D7D9DB',
      'light-5': '#D0D2D3',
      'dark-1': '#192E3A', // darkest >>>
      'dark-2': '#2C3F4B',
      'dark-3': '#667884', // AA
      'dark-4': '#8896A0', // AA large
      empowerment: '#262064', // AA
      empowermentDark: '#262064', // AA
      empowermentCloud: '#262064', // AA
      physint: '#6C3F99', // AA large
      physintDark: '#6C3F99', // AA
      physintCloud: '#6C3F99', // AA
      esr: '#27AAE1', // AA large
      esrDark: '#027AC0', // AA
      esrCloud: '#004f8f', // AA
    },
    // margins & paddings
    edgeSize: {
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
    },
    breakpoints: {
      small: {
        value: myBreakpoints[0],
      },
      medium: {
        value: myBreakpoints[1],
      },
      large: {
        value: myBreakpoints[2],
      },
      xlarge: {},
    },
  },
  tab: {
    pad: {
      vertical: 'none',
      bottom: '1px',
    },
    margin: {
      vertical: 'none',
    },
    extend: props => css`
      font-weight: ${props.theme.columnHeader.fontWeight};
    `,
  },
  tabs: {
    header: {
      extend: props => css`
        padding-left: ${props.theme.global.edgeSize.medium};
        border-bottom: ${props.theme.columnHeader.border};
      `,
    },
  },
  columnHeader: {
    border: '1px solid',
    fontWeight: 600,
  },
  maxWidth: '1200px',
  // colors: {
  //   white: '#fff',
  //   black: '#09052F',
  //   hover: '#2956D1',
  //   hoverLight: '#EFEFEF',
  //   darkBlue: '#3A5161',
  //   dark: '#192E3A', // darkest >>>
  //   dark2: '#2C3F4B',
  //   dark3: '#667884', // AA
  //   dark4: '#8896A0', // AA large
  //   light5: '#D0D2D3',
  //   light4: '#D7D9DB',
  //   light3: '#E8EAE9',
  //   light2: '#EFEFEF',
  //   light: '#F2F3F4', // <<< lightest
  //   highlight: '#FDB933',
  //   highlight2: '#DB7E00', // AA large
  //   highlight3: '#AD6500', // AA
  // },
};

export const ICON_SIZE = 38; // default size
export const ICONS = {
  brand: {
    sizes: [40, 26],
    path:
      'M16.18,14.06,28.12,26,26,28.12,14.06,16.18,2.12,28.12,0,26,11.94,14.06,0,2.12,2.12,0,14.06,11.94,26,0l2.12,2.12Z',
  },
};

export default theme;
