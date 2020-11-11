/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Heading, Text } from 'theme-ui'
import { useIntl } from 'react-intl'

import Layout from '../../components/Layout'

export default function Index () {
  const { messages } = useIntl()

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          {/* <Heading as='h1'>{messages['hrmi.app.title']}</Heading> */}
          <Text>country page</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

Index.withLayout = page => <Layout>{page}</Layout>
