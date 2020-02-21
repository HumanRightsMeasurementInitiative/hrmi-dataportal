import { css } from 'styled-components';

export const SIZES = {
  header: {
    height: 100,
    heightTop: 44,
    heightBottom: 56,
  },
  aside: {
    width: [0, 0, 280, 360, 440],
  },
  settings: {
    height: 90,
    heightCollapsed: 40,
  },
};

export const CARD_WIDTH = {
  min: 200,
  max: 250,
};

// theme defining breakpoints, colors, sizes, grid gutters
// breakpoints:
// < 720px (45em): small (mobile)
// 0: < 960px (60em): medium (tablet portrait)
// 1: < 1152px (72em): large (tablet landscape, desktop)
// 2: > 1152px (72em): xlarge
// const myBreakpoints = [720, 992, 1152, 10000];
export const BREAKPOINTS = {
  small: {
    min: 0,
    max: 720, // inclusive
    name: 'mobile',
    index: 0,
  },
  medium: {
    min: 720, // exclusive
    max: 992,
    name: 'tablet (portrait)',
    index: 1,
  },
  large: {
    min: 992, // exclusive
    max: 1152,
    name: 'laptop/tablet (landscape)',
    index: 2,
  },
  xlarge: {
    min: 1152, // exclusive
    max: 1728,
    name: 'desktop',
    index: 3,
  },
  xxlarge: {
    min: 1728, // exclusive
    max: 99999999,
    name: 'large desktop',
    index: 4,
  },
};

const text = {
  xxlarge: { size: '30px', height: '36px', maxWidth: '700px' },
  xlarge: { size: '24px', height: '30px', maxWidth: '700px' },
  large: { size: '20px', height: '25px', maxWidth: '700px' },
  medium: { size: '16px', height: '21px', maxWidth: '700px' },
  small: { size: '14px', height: '18px', maxWidth: '600px' },
  xsmall: { size: '13px', height: '16px', maxWidth: '400px' },
  xxsmall: { size: '12px', height: '14px', maxWidth: '400px' },
};
const theme = {
  sizes: SIZES,
  // used for grommet
  text,
  paragraph: text,
  breakpoints: {
    small: `${BREAKPOINTS.small.max}px`, // max
    medium: `${BREAKPOINTS.medium.min}px`, // min
    large: `${BREAKPOINTS.large.min}px`, // min
    xlarge: `${BREAKPOINTS.xlarge.min}px`, // min
    xxlarge: `${BREAKPOINTS.xxlarge.min}px`, // min
  },
  breakpointsMin: {
    small: `${BREAKPOINTS.small.max + 1}px`, // max
    medium: `${BREAKPOINTS.medium.min + 1}px`, // min
    large: `${BREAKPOINTS.large.min + 1}px`, // min
    xlarge: `${BREAKPOINTS.xlarge.min + 1}px`, // min
    xxlarge: `${BREAKPOINTS.xxlarge.min + 1}px`, // min
  },
  icon: {
    size: {
      small: '12px',
      medium: '16px',
      large: '20px',
      xlarge: '24px',
    },
  },
  navTop: '60px',
  global: {
    input: {
      padding: '2px',
      weight: 400,
    },
    font: {
      family: 'Source Sans Pro',
      height: '22px',
      size: '16px',
    },
    colors: {
      black: '#101D24',
      white: '#FFFFFF',
      text: { light: '#3A5161' },
      border: { light: '#E8EAE9' },
      'light-1': '#F2F3F4', // <<< lightest      empowerment: '#262064', // AA large
      'light-2': '#EFEFEF',
      'light-3': '#E8EAE9',
      'light-4': '#D7D9DB',
      'light-5': '#D0D2D3',
      'dark-1': '#192E3A', // darkest >>>
      'dark-2': '#2C3F4B',
      'dark-3': '#667884', // AA
      'dark-4': '#8896A0', // AA large
      dark: '#3A5161',
      brand: '#3A5161',
      highlight: '#FDB933',
      highlight2: '#DB7E00', // AA large
      highlight3: '#AD6500', // AA
      focus: 'transparent',
      selected: 'brand',
      empowermentTrans: 'rgba(38, 32, 100, 0.3)', // AA
      empowerment: '#262064', // AA
      empowermentDark: '#262064', // AA
      empowermentCloud: '#262064', // AA
      physintTrans: 'rgba(108, 63, 153, 0.3)', // AA
      physint: '#6C3F99', // AA large
      physintDark: '#6C3F99', // AA
      physintCloud: '#6C3F99', // AA
      esrTrans: 'rgba(39, 170, 225, 0.3)', // AA large
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
      ms: '16px',
      medium: '24px',
      ml: '36px',
      large: '48px',
      xlarge: '72px',
    },
    breakpoints: {
      small: {
        value: BREAKPOINTS.small.max,
      },
      medium: {
        value: BREAKPOINTS.medium.max,
      },
      large: {
        value: BREAKPOINTS.large.max,
      },
      xlarge: {
        value: BREAKPOINTS.xlarge.max,
      },
      xxlarge: {},
    },
  },
  heading: {
    level: {
      1: {
        small: {
          size: '24px',
          height: '28px',
        },
        medium: {
          size: '30px',
          height: '36px',
        },
        large: {
          size: '42px',
          height: '48px',
        },
      },
      2: {
        small: {
          size: '20px',
          height: '24px',
        },
        medium: {
          size: '24px',
          height: '30px',
        },
        large: {
          size: '30px',
          height: '36px',
        },
      },
      3: {
        small: {
          size: '18px',
          height: '22px',
        },
        medium: {
          size: '21px',
          height: '25px',
        },
        large: {
          size: '24px',
          height: '30px',
        },
      },
      4: {
        small: {
          size: '16px',
          height: '20px',
        },
        medium: {
          size: '20px',
          height: '26px',
        },
      },
      5: {
        small: {
          size: '14px',
          height: '20px',
        },
        medium: {
          size: '16px',
          height: '22px',
        },
      },
      6: {
        small: {
          size: '13px',
          height: '16px',
        },
        medium: {
          size: '14px',
          height: '20px',
        },
      },
    },
  },
  tab: {
    pad: {
      horizontal: 'small',
      bottom: '8px',
    },
    margin: {
      right: '4px',
      left: 'none',
      vertical: 'none',
    },
    color: '#3A5161',
    active: {
      color: '#3A5161',
    },
    hover: {
      color: '#667884',
    },
    border: {
      size: '4px',
      color: 'transparent',
      active: {
        color: '#3A5161',
      },
      hover: {
        color: '#667884',
      },
    },
    extend: props => css`
      font-weight: ${props.theme.columnHeader.fontWeight};
      height: 30px;
    `,
  },
  accordion: {
    heading: {
      level: 6,
    },
  },
  columnHeader: {
    border: '1px solid',
    fontWeight: 600,
  },
  layer: {
    border: {
      radius: 0,
    },
  },
  maxWidth: '1600px',
  maxWidthMedium: '1068px',
  maxWidthNarrow: '800px',
};

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
 */

export const ICON_SIZE = 24; // default size
export const ICONS = {
  COUNTRY:
    'M12,1.25A10.75,10.75,0,1,0,22.75,12,10.76,10.76,0,0,0,12,1.25ZM2.75,12A9.15,9.15,0,0,1,4,7.45l-.61,2.67L4.47,12.9,4.77,14s1.36,4.21,1.36,4.43A13,13,0,0,0,8,20.31,9.26,9.26,0,0,1,2.75,12ZM12,21.25a9.23,9.23,0,0,1-3.86-.85L8,19.28l1.43-1,.9-2L10,15,6,12.67,5,13V12L5.15,11l4.2-2.78-.82-1.8-.9.45L7.1,6l2-1.12L8.74,3.35a9.21,9.21,0,0,1,6.84.12L16,4,15,4.45,15.05,6l.9.3.15.38-.82.52-1-.3-.15.38.6.75L14.6,9l-.6.22V10h.9l1.5-1.65,2.33.37.37.75-1.72.76-.83-.38-2.17.9-1.13,2.18,1.28,1,1.87-.07s1.73,2.25,1.43,2.25-.6,2.1-.6,2.1l2.62-1.31A9.26,9.26,0,0,1,12,21.25Zm8.23-5.05,1-3.57-.3-1.28L19.63,10l1.2.83.23-.7A9.64,9.64,0,0,1,21.25,12,9.14,9.14,0,0,1,20.23,16.2ZM12.12,3.36a12.65,12.65,0,0,1,.53,1.2L10.17,7,9.8,4.11S12,3.14,12.12,3.36Z',
  METRICS:
    'M4,14H7v7H4Zm4,7h3V10H8Zm4,0h3V11H12Zm4,0h3V7H16ZM12.83,8.66l6.29-5.45-1-1.14L12.62,6.85l-3.8-2L3.09,8.68l.83,1.25,5-3.32Z',
  BRAND: {
    sizes: [188.11, 54.73],
    paths: [
      'M46.77.54A.51.51,0,0,1,47.31,0h6.84a.51.51,0,0,1,.54.54V14.21a.29.29,0,0,0,.32.32H67a.29.29,0,0,0,.32-.32V.54A.51.51,0,0,1,67.82,0h6.83a.51.51,0,0,1,.54.54V35.92a.51.51,0,0,1-.54.54H67.82a.51.51,0,0,1-.54-.54v-14a.28.28,0,0,0-.32-.32H55a.28.28,0,0,0-.32.32v14a.51.51,0,0,1-.54.54H47.31a.51.51,0,0,1-.54-.54Zm60.36,35.92a.41.41,0,0,0,.38-.64L100.3,21.45a10.68,10.68,0,0,0,6.51-10.13c0-6.65-5-11.31-12.43-11.31H79.79a.51.51,0,0,0-.54.54V35.92a.51.51,0,0,0,.54.54h6.83a.51.51,0,0,0,.54-.54v-13a.28.28,0,0,1,.32-.32h4.9l6.3,13.35a.73.73,0,0,0,.81.54ZM98.9,11.31c0,2.79-1.94,4.56-5,4.56H87.49a.28.28,0,0,1-.32-.32V7.13a.28.28,0,0,1,.32-.32h6.46c3,0,5,1.77,5,4.5m10.66,24.61a.51.51,0,0,0,.54.54h6.08a.51.51,0,0,0,.54-.54V15.39h.22l6.78,15.39a1,1,0,0,0,1,.7h3.71a1,1,0,0,0,1-.7l6.78-15.39h.22V35.92a.51.51,0,0,0,.54.54h6.08a.51.51,0,0,0,.54-.54V.54a.51.51,0,0,0-.54-.54h-6.3a.83.83,0,0,0-.86.54l-9.1,20.8h-.22L117.36.54A.83.83,0,0,0,116.5,0h-6.4a.51.51,0,0,0-.54.54Zm38.13,0a.51.51,0,0,0,.54.54h6.83a.51.51,0,0,0,.54-.54V.54a.51.51,0,0,0-.54-.54h-6.83a.51.51,0,0,0-.54.54Z',
      'M29.72,26.07a2.26,2.26,0,1,1-2.26-2.26,2.26,2.26,0,0,1,2.26,2.26',
      'M21.32,2.26A2.26,2.26,0,1,1,19.06,0a2.26,2.26,0,0,1,2.26,2.26',
      'M29.72,10.19a2.26,2.26,0,1,1-2.26-2.26,2.26,2.26,0,0,1,2.26,2.26',
      'M12.92,10.19a2.26,2.26,0,1,1-2.26-2.26,2.26,2.26,0,0,1,2.26,2.26',
      'M21.32,34a2.26,2.26,0,1,1-2.26-2.26A2.26,2.26,0,0,1,21.32,34',
      'M38.11,34a2.26,2.26,0,1,1-2.26-2.26A2.26,2.26,0,0,1,38.11,34',
      'M38.11,18.13a2.26,2.26,0,1,1-2.26-2.26,2.26,2.26,0,0,1,2.26,2.26',
      'M38.11,2.26A2.26,2.26,0,1,1,35.85,0a2.26,2.26,0,0,1,2.26,2.26',
      'M21.32,18.13a2.26,2.26,0,1,1-2.26-2.26,2.26,2.26,0,0,1,2.26,2.26',
      'M4.53,2.26A2.26,2.26,0,1,1,2.26,0,2.26,2.26,0,0,1,4.53,2.26',
      'M4.53,18.13a2.26,2.26,0,1,1-2.26-2.26,2.26,2.26,0,0,1,2.26,2.26',
      'M4.53,34a2.26,2.26,0,1,1-2.26-2.26A2.26,2.26,0,0,1,4.53,34',
    ],
  },
  SETTINGS:
    'M14.56,22H10.44a.52.52,0,0,1-.51-.42l-.39-2.65a7.57,7.57,0,0,1-1.73-1L5.25,19a.57.57,0,0,1-.18,0,.52.52,0,0,1-.45-.25L2.56,15.26a.51.51,0,0,1,.13-.64L4.86,13a5.61,5.61,0,0,1,0-2L2.7,9.38a.49.49,0,0,1-.13-.64L4.63,5.28a.52.52,0,0,1,.63-.23l2.56,1a7.75,7.75,0,0,1,1.73-1l.39-2.65a.51.51,0,0,1,.5-.43h4.12a.51.51,0,0,1,.51.43l.39,2.64a7.57,7.57,0,0,1,1.73,1l2.56-1,.18,0a.52.52,0,0,1,.45.25l2.06,3.47a.51.51,0,0,1-.13.63L20.14,11a6.46,6.46,0,0,1,.07,1,8.06,8.06,0,0,1-.06,1l2.15,1.64a.49.49,0,0,1,.13.64l-2.06,3.47a.52.52,0,0,1-.63.22l-2.56-1a7.18,7.18,0,0,1-1.73,1l-.39,2.65A.48.48,0,0,1,14.56,22ZM12.5,8.25A3.81,3.81,0,0,0,8.64,12a3.86,3.86,0,0,0,7.72,0A3.81,3.81,0,0,0,12.5,8.25Z',
};

export default theme;
