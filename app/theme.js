// theme defining breakpoints, colors, sizes, grid gutters
// breakpoints:
// < 720px (45em): extra-small (mobile)
// > 960px (60em): small (tablet portrait)
// >= 1152px (72em): medium (tablet landscape, desktop)
const myBreakpoints = [720, 960, 1152];
// theme breakpoints
export const BREAKPOINTS = {
  MOBILE: -1,
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
};
const theme = {
  // used for grommet
  global: {
    font: {
      family: 'Source Sans Pro',
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
      empowermentDark: '#262064', // AA
      physint: '#6C3F99', // AA large
      physintDark: '#6C3F99', // AA
      esr: '#27AAE1', // AA large
      esrDark: '#027AC0', // AA
    },
    size: {
      full: '100%',
      large: '768px',
      medium: '384px',
      small: '192px',
      xlarge: '1152px',
      xsmall: '96px',
      xxlarge: '1536px',
      xxsmall: '48px',
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
    },
  },
  breakpoints: myBreakpoints.map(bp => `${bp}px`), // used for rebass/grid, also hidden/visible
  space: [0, 6, 12, 18, 24], // used for rebass/grid
  maxWidth: '940px',
  sizes: ['12px', '14px', '18.66px', '28px', '34px'],
  colors: {
    white: '#fff',
    black: '#09052F',
    hover: '#2956D1',
    hoverLight: '#EFEFEF',
    darkBlue: '#3A5161',
    dark: '#192E3A', // darkest >>>
    dark2: '#2C3F4B',
    dark3: '#667884', // AA
    dark4: '#8896A0', // AA large
    light5: '#D0D2D3',
    light4: '#D7D9DB',
    light3: '#E8EAE9',
    light2: '#EFEFEF',
    light: '#F2F3F4', // <<< lightest
    highlight: '#FDB933',
    highlight2: '#DB7E00', // AA large
    highlight3: '#AD6500', // AA
  },
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
