import { ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'

import theme from '../theme'

// TODO: figure out if this way of simple importing is conditionally loading messages thanks to some Next magic :)
import messagesEN from '../lang/en.json'
import messagesFR from '../lang/fr.json'

export default function App ({ Component, pageProps }) {
  const { locale, defaultLocale } = useRouter()

  return (
    <>
      <Head>
        <title>Human Rights Measurement Initiative</title>
      </Head>
      <ThemeProvider theme={theme}>
        <IntlProvider
          defaultLocale={defaultLocale}
          locale={locale}
          messages={locale === 'en' ? messagesEN : messagesFR}
        >
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
      <Global
        styles={theme => ({
          '*': {
            boxSizing: 'border-box'
          },
          'html, body, #__next': {
            height: '100%',
            width: '100%',
            margin: 0
          }
        })}
      />
    </>
  )
}
