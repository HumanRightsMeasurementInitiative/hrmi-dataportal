/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from 'theme';

import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/hrmi-og.png';
import '!file-loader?name=[name].[ext]!./images/hrmi-twitter.png';
import '!file-loader?name=[name].[ext]!./images/browserconfig.xml';
import '!file-loader?name=[name].[ext]!./images/safari-pinned-tab.svg';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages, appLocales, DEFAULT_LOCALE } from './i18n';

// HACK: firebase redirects not working, use JS implementation instead
if (window.location.hostname === 'rightstracker-2021-embargoed.web.app') {
  window.location = `https://rightstracker.org${window.location.pathname}${
    window.location.search
  }`;
}

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const chakraTheme = extendTheme({
  fonts: {
    heading:
      "'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    body: "'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
});
delete chakraTheme.colors;
chakraTheme.colors = { ...theme.global.colors, purple: '#262064' };

// setting up route for locale: will forward to default locale
const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider theme={chakraTheme} resetCSS={false}>
        <Grommet theme={theme}>
          <LanguageProvider messages={messages}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route
                  path={`/:locale(${appLocales.join('|')})`}
                  component={App}
                />
                <Redirect to={`/${DEFAULT_LOCALE}`} />
              </Switch>
            </ConnectedRouter>
          </LanguageProvider>
        </Grommet>
      </ChakraProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/fr.js'),
        import('intl/locale-data/jsonp/es.js'),
        import('intl/locale-data/jsonp/pt.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
// updating SW according to https://github.com/react-boilerplate/react-boilerplate/issues/2750#issuecomment-536215256
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require
  runtime.install({
    onUpdateReady: () => {
      // console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    // onUpdated: () => {
    //   console.log('SW Event:', 'onUpdated');
    //   // Reload the webpage to load into the new version
    //   window.location.reload();
    // },
  });
}
