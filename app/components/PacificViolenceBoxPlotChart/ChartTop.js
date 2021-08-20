import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react'

export default function ChartTop ({
  color,
  yLabelText,
  xLabelText,
  range
}) {
  return (
    <Flex mb={1} align='end' width='100%'>
      <Box pe={4} width={44} minW={44}>
        <Text fontWeight='300' fontSize={14} color={color}>
					{yLabelText}
        </Text>
      </Box>
      {xLabelText && (
        <Flex align='end' justify='space-between' width='100%'>
          <Text fontSize={13} color='purple' transform='translateX(-50%)'>
            {range[0]}
          </Text>
          <Flex>
            <Text me={1} fontSize={13} color='purple'>
							{xLabelText}
            </Text>
          </Flex>
          <Flex direction='column' align='center' transform='translateX(50%)'>
            <Text fontSize={13} color='purple'>
              {range[1]}
            </Text>
          </Flex>
        </Flex>
      )}
      <Box ps={4} minW={14} />
    </Flex>
  )
}
