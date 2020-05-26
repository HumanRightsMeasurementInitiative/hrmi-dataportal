import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    word-break: normal;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #262064;
    @media (min-width: ${({ theme }) => theme.breakpointsMin.sm}) {
      overflow-y: scroll;
    }
  }

  body.fontLoaded {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5;
  }
  p {
    margin: 0.5em 0;
  }
  .hrmi-html p {
    margin: 1em 0;
    &:first-child {
      font-size: 1.1em;
      line-height: 1.3;
      margin: 2em 0;
      @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
        font-size: 1.2em;
        line-height: 1.4;
      }
    }
  }
  .hrmi-html a {
    color: #262262;
    text-decoration: underline;
    font-weight: 600;
    &:hover {
      opacity: 0.8;
    }
  }
  .hrmi-html a.hero {
    color: #ffffff;
    background-color: #262262;
    padding: 5px 20px;
    margin: 20px 0;
    border-radius: 5px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    &:hover {
      opacity: 0.8;
      background-color: #626096;
    }
  }
  .hrmi-html h3 {
    font-size: 20px;
  }
  .hrmi-html h4 {
    font-size: 18px;
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
  .hrmi-html hr {
    margin: 4em 0;
  }

  .react-multi-carousel-list__custom {
    display: flex;
    align-items: center;
    position: relative;
    overflow: visible !important;
  }
`;

export default GlobalStyle;
