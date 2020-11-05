export default {
  breakpoints: ['420px', '720px', '992px', '1152px', '1728px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [10, 14, 18, 24, 28, 32, 36, 38, 52],
  maxWidth: 1328, // TODO: a conventional way to do this?
  colors: {
    background: '#FFFFFF',
    black: '#101D24',
    white: '#FFFFFF',
    textDark: '#FFFFFF', //  on dark background
    textLight: '#262262', // on light background (empowerment)
    borderLight: '#ceced2',
    borderDark: '#ffffff',
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
    buttonSecondaryOnWhiteHover: '#deddec'
  },
  fonts: {
    body: '"Source Sans Pro", system-ui, sans-serif',
    heading: '"Source Sans Pro", sans-serif'
  },
  text: {
    default: {
      fontSize: 16,
      color: 'textLight'
    },
    h1: {
      fontSize: [26, 30, 50],
      fontWeight: 800,
      color: 'red'
    },
    h2: {
      fontSize: [20, 24, 30],
      fontWeight: 800,
      color: 'textLight'
    },
    h3: {
      fontSize: [18, 21, 24],
      fontWeight: 600,
      color: 'textLight'
    },
    h4: {
      fontSize: [16, 20],
      fontWeight: 600,
      color: 'textLight'
    },
    h5: {
      fontSize: [14, 16],
      fontWeight: 600,
      color: 'textLight'
    },
    h6: {
      fontSize: [13, 15],
      fontWeight: 600,
      color: 'textLight'
    },
    p1: {
      fontSize: [18, 24],
      fontWeight: 500,
      color: 'text'
    },
    p2: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: '28px',
      color: 'text'
    },
    p3: {
      fontSize: [15, 18],
      fontWeight: 400,
      lineHeight: '22px',
      color: 'text'
    },
    p4: {
      fontSize: 18,
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: '22px',
      color: 'text'
    },
    p5: {
      fontSize: 14,
      fontWeight: 300,
      fontStyle: 'italic',
      color: 'text'
    },
    link: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: '28px',
      textDecoration: 'underline',
      color: 'text'
    },
    button: {
      fontSize: 18,
      fontWeight: 900,
      color: 'text'
    },
    button2: {
      fontSize: 18,
      fontWeight: 600,
      color: 'text'
    },
    stats: {
      fontSize: 52,
      fontWeight: 900,
      color: 'text'
    },
    headline: {
      fontWeight: 700,
      fontSize: 4,
      color: 'white'
    },
    subHeadline: {
      fontWeight: 500,
      fontSize: 3,
      color: 'white'
    },
    smallBold: {
      fontSize: 14,
      fontWeight: 800,
      color: 'text'
    },
    quote: {
      fontSize: [15],
      fontWeight: 400,
      fontStyle: 'italic',
      color: 'text'
    }
  },
  buttons: {
    primary: {
      fontFamily: 'body',
      fontSize: 13,
      fontWeight: 900,
      color: 'text',
      bg: 'grey',
      cursor: 'pointer',
      borderRadius: 0,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'text',
      '&:hover': {
        opacity: 0.7
      }
    },
    secondary: {
      fontFamily: 'body',
      fontSize: 13,
      fontWeight: 900,
      color: 'text',
      bg: 'white',
      cursor: 'pointer',
      borderRadius: 0,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'text',
      '&:hover': {
        opacity: 0.7
      }
    },
    tertiary: {
      padding: 0,
      fontFamily: 'body',
      fontSize: [15, 18],
      fontWeight: 600,
      color: 'text',
      bg: 'white',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.7
      }
    },
    disabled: {
      fontFamily: 'body',
      fontSize: 13,
      fontWeight: 900,
      color: 'midGrey',
      bg: 'grey',
      cursor: 'auto',
      borderRadius: 0,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'text'
    }
  },
  styles: {
    root: {
      fontFamily: 'body'
    },
    a: {
      cursor: 'pointer'
    }
  },
  links: {
    nav: {
      color: 'white',
      '&:hover': {
        opacity: 0.7
      },
      cursor: 'pointer'
    },
    learn: {
      fontSize: 18,
      fontWeight: 900,
      textDecoration: 'none',
      color: 'text',
      cursor: 'pointer',
      borderBottom: 'solid black 2px',
      '&:hover': {
        opacity: 0.7
      }
    },
    site: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
      minWidth: 5,
      fontFamily: 'body',
      fontSize: 13,
      fontWeight: 900,
      textDecoration: 'none',
      color: 'text',
      bg: 'white',
      cursor: 'pointer',
      borderRadius: 0,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'text',
      '&:hover': {
        opacity: 0.7
      }
    }
  },
  forms: {
    input: {
      fontFamily: 'body',
      bg: 'grey',
      color: 'text',
      borderRadius: 0
    },
    textarea: {
      fontFamily: 'body'
    },
    label: {
      fontFamily: 'body',
      fontWeight: 500,
      fontSize: 1
    }
  }
}
