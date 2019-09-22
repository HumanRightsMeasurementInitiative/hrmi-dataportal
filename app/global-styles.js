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
    color: #3A5161;
    @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
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
      @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
        font-size: 1.2em;
        line-height: 1.4;
      }
    }
  }
  .hrmi-html a {
    background: #F2F3F4;
    padding: 2px 6px;
    color: #3A5161;
    text-decoration: none;
    font-weight: 600;
    border-radius: 3px;
    &:hover {
      background: #FDB933;
    }
  }
`;

export default GlobalStyle;
