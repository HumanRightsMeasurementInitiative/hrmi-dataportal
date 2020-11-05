/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Heading, Text } from 'theme-ui'

import Layout from '../components/Layout'

export default function Index () {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading>Rights Tracker</Heading>
          <Text>Measuring the human rights performance of countries</Text>
        </Flex>
      </Flex>
    </Flex>  
  )
}

Index.withLayout = page => <Layout>{page}</Layout>
