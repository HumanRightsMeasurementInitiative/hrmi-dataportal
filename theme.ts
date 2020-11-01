export default {
  breakpoints: ['420px', '720px', '992px', '1152px', '1728px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [10, 14, 18, 24, 28, 32, 36, 38, 52],
  maxWidth: 1328, // TODO: a conventional way to do this?
  colors: {
    text: '#333333',
    background: 'white',
    greyBackground: '#FAFAFA',
    grey: '#ECECEC',
    lightGrey: '#A0A0A0',
    midGrey: '#515151',
    light: '#979797',
    reportCircleBlack: '#3A3A3A',
    climate: '#6666CC',
    waste: '#FF9933',
    community: '#FF66CC',
    landAndWater: '#66CC66',
    tomato: '#cf4718'
  },
  fonts: {
    body: '"Source Sans Pro", system-ui, sans-serif',
    heading: '"Source Sans Pro", sans-serif'
  },
  text: {
    default: {
      fontSize: 2,
      color: 'text'
    },
    h1: {
      fontSize: [32, 38],
      fontWeight: 800,
      color: 'text'
    },
    h2: {
      fontSize: 28,
      fontWeight: 800,
      color: 'text'
    },
    h3: {
      fontSize: 14,
      fontWeight: 600,
      fontStyle: 'italic',
      color: 'text'
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
