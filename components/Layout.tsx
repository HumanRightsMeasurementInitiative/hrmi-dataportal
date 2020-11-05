/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Heading, Text } from 'theme-ui'

import Nav from '../components/Nav'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout ({ children }: LayoutProps) {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Nav />
      {children}
    </Flex>
  )
}
