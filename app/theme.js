export const SIZES = {
  containerMaxWidth: 1328,
  // containerMaxWidth / 2 + edgesize.xxlarge
  imageHomeMaxWidth: 700,
  header: {
    height: 100,
    padTop: 0,
    padRight: 0,
    padBottom: 0,
    padTopBottom: 10,
    brandWidth: 380,
    logoWidth: 200,
    heightTop: 50,
    heightBottom: 50,
    small: {
      height: 80,
      heightTop: 50,
      heightBottom: 30,
      padTop: 9,
      padRight: 14,
      padBottom: 0,
      padTopBottom: 0,
      logoWidth: 120,
      brandWidth: 200,
    },
  },
  top: {
    height: 350,
  },
  aside: {
    // small, sm, medium, large, xlarge, xxlarge
    width: [0, 0, 0, 360, 420, 420],
  },
  settings: {
    height: 90,
    heightCollapsed: 40,
  },
  search: {
    medium: 32,
    large: 44,
    xlarge: 56,
  },
  charts: {
    // small, sm, medium, large, xlarge, xxlarge
    labels: [90, 100, 120, 120, 140, 180],
    scoresAside: [30, 60, 60, 40, 60, 80],
  },
};

export const CARD_WIDTH = {
  min: 220,
  max: 300,
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
    max: 420, // inclusive
    name: 'mobile',
    index: 0,
  },
  sm: {
    min: 420, // exclusive
    max: 720,
    name: 'mobile (landscape)',
    index: 1,
  },
  medium: {
    min: 720, // exclusive
    max: 992,
    name: 'tablet (portrait)',
    index: 2,
  },
  large: {
    min: 992, // exclusive
    max: 1152,
    name: 'laptop/tablet (landscape)',
    index: 3,
  },
  xlarge: {
    min: 1152, // exclusive
    max: 1728,
    name: 'desktop',
    index: 4,
  },
  xxlarge: {
    min: 1728, // exclusive
    max: 99999999,
    name: 'large desktop',
    index: 5,
  },
};

const text = {
  xxxlarge: { size: '60px', height: '75px', maxWidth: '800px' },
  xxlarge: { size: '30px', height: '36px', maxWidth: '800px' },
  xlarge: { size: '22px', height: '30px', maxWidth: '800px' },
  large: { size: '18px', height: '24px', maxWidth: '800px' },
  medium: { size: '16px', height: '21px', maxWidth: '800px' },
  small: { size: '14px', height: '18px', maxWidth: '700px' },
  xsmall: { size: '13px', height: '16px', maxWidth: '600px' },
  xxsmall: { size: '12px', height: '14px', maxWidth: '500px' },
  xxxsmall: { size: '10px', height: '14px', maxWidth: '500px' },
};
const icon = {
  size: {
    small: '14px',
    medium: '17px',
    large: '20px',
    xlarge: '24px',
    xxlarge: '32px',
  },
};
const edgeSize = {
  hair: '1px',
  xxsmall: '3px',
  xsmall: '6px',
  small: '12px',
  ms: '16px',
  medium: '24px',
  ml: '36px',
  large: '48px',
  xlarge: '64px',
  xxlarge: '100px',
};

const theme = {
  sizes: SIZES,
  // used for grommet
  text,
  paragraph: text,
  breakpoints: {
    small: `${BREAKPOINTS.small.min}px`, // max
    sm: `${BREAKPOINTS.sm.min}px`, // max
    medium: `${BREAKPOINTS.medium.min}px`, // min
    large: `${BREAKPOINTS.large.min}px`, // min
    xlarge: `${BREAKPOINTS.xlarge.min}px`, // min
    xxlarge: `${BREAKPOINTS.xxlarge.min}px`, // min
  },
  breakpointsMin: {
    small: `${BREAKPOINTS.small.min + 1}px`, // min
    sm: `${BREAKPOINTS.sm.min + 1}px`, // min
    medium: `${BREAKPOINTS.medium.min + 1}px`, // min
    large: `${BREAKPOINTS.large.min + 1}px`, // min
    xlarge: `${BREAKPOINTS.xlarge.min + 1}px`, // min
    xxlarge: `${BREAKPOINTS.xxlarge.min + 1}px`, // min
  },
  icon,
  navTop: '60px',
  global: {
    active: {
      color: {
        dark: 'white',
        light: '#262262',
      },
    },
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
      text: {
        dark: '#FFFFFF', //  on dark background
        light: '#262262', // on light background (empowerment)
      },
      border: { light: '#ceced2', dark: '#ffffff' },
      'light-0': '#F8F8F8', // <<< lightest      empowerment: '#262064', // AA large
      'light-1': '#F0EFF5', // <<< lightest      empowerment: '#262064', // AA large
      'light-2': '#EFEFEF',
      'light-3': '#E8EAE9',
      'light-4': '#D7D9DB',
      'light-5': '#D0D2D3',
      'dark-1': '#192E3A', // darkest >>>
      'dark-2': '#2C3F4B',
      'dark-3': '#757575', // AA
      'dark-4': '#8896A0', // AA large
      dark: '#262262', // empowerment',
      darker: '#110d50', // empowerment',
      secondary: '#757575',
      disabled: '#8896A0',
      hint: '#393393',
      brand: '#3A5161',
      highlight: '#FDB933',
      highlight2: '#DB7E00', // AA large
      highlight3: '#AD6500', // AA
      focus: 'transparent',
      selected: 'brand',
      empowermentTrans: 'rgba(38, 32, 100, 0.3)', // AA
      empowermentActiveTrans: 'rgba(38, 32, 100, 0.3)', // AA
      empowerment: '#262262', // AA
      empowermentLight: '#DFDFEF', // AA
      empowermentDark: '#262262', // AA
      empowermentActive: '#110d50', // AA
      empowermentCloud: '#262262', // AA
      physintTrans: 'rgba(108, 63, 153, 0.3)', // AA
      physintActiveTrans: 'rgba(108, 63, 153, 0.3)', // AA
      physint: '#6C3F99', // AA large
      physintLight: '#E7DFEF', // AA large
      physintDark: '#6C3F99', // AA
      physintActive: '#491d75', // AA
      physintCloud: '#6C3F99', // AA
      esrTrans: 'rgba(39, 170, 225, 0.3)', // AA large
      esrActiveTrans: 'rgba(39, 170, 225, 0.3)', // AA large
      esr: '#27AAE1', // AA large
      esrLight: '#D9EBF2', // AA large
      esrDark: '#027AC0', // AA
      esrActive: '#0674b5', // AA
      esrCloud: '#004f8f', // AA
      esrIndicator: '#a9ddf3',
      esrIndicatorActive: '#27AAE1',
      esrIndicatorTrans: 'rgba(169, 221, 243, 0.3)',
      esrIndicatorActiveTrans: 'rgba(169, 221, 243, 0.3)',
      esrIndicatorDark: '#027AC0', // AA
      hover: '#6C3F99',
      countries: '#0D6D64',
      countriesLight: '#C9E0D4',
      countriesLightRGBA: 'rgba(38, 32, 100, .85)',
      metrics: '#7F59A6',
      people: '#BD5747',
      sectionDark: '#FFFAE8',
      sectionCountries: '#f2fff8',
      sectionDataCards: '#f9e8e4',
      sectionPeople: '#fdf0dd',
      sectionAbout: '#ededf5',
      sectionCountryOverview: '#ededf5',
      graphicRed: '#EF4123',
      graphicPurple: '#8D60BA',
      graphicYellow: '#FDC65B',
      buttonPrimary: '#7F59A6',
      footer: '#423E86',
      female: '#EE5A45',
      male: '#0D6D64',
      allPeople: '#027AC0',
      femaleActive: '#EE5A45',
      maleActive: '#0D6D64',
      femaleTrans: 'rgba(238, 90, 69, 0.3)',
      maleTrans: 'rgba(13, 109, 100, 0.3)',
      buttonPrimaryHover: '#626096',
      buttonSecondary: '#deddec',
      buttonSecondaryOnWhite: '#ededf5',
      buttonSecondaryHover: '#c8c6e0',
      buttonSecondaryOnWhiteHover: '#deddec',
    },
    // margins & paddings
    edgeSize,
    breakpoints: {
      small: {
        value: BREAKPOINTS.small.max,
      },
      sm: {
        value: BREAKPOINTS.sm.max,
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
          size: '26px',
          height: '30px',
        },
        medium: {
          size: '30px',
          height: '36px',
        },
        large: {
          size: '50px',
          height: '62px',
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
          size: '15px',
          height: '20px',
        },
      },
    },
  },
  columnHeader: {
    border: '1px solid',
    fontWeight: 600,
  },
  layer: {
    container: {
      zIndex: 21,
    },
    border: {
      radius: 0,
    },
  },
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
  BRAND: {
    sizes: [188.11, 36],
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

export const IMAGES = {
  BRAND: {
    url: 'images/HRMI-Logo-HOR-RGB-x2.png',
    sizes: [264, 93],
  },
};

export default theme;
