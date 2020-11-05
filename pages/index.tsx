/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Heading, Text } from 'theme-ui'

import Layout from '../components/Layout'

export default function Index () {
  return <Heading>HRMI</Heading>
}

Index.withLayout = page => <Layout>{page}</Layout>
