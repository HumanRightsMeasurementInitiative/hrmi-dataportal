import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #3A5161;
    overflow-y: scroll;
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

  .hrmi-html p {
    &:first-child {
      font-size: 1.2em;
      line-height: 1.4;
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
