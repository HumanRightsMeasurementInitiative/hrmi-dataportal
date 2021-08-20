import React from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import ChartTop from './ChartTop'

import map from 'lodash/map'

import rootMessages from 'messages';

function PacificViolenceBoxPlotChart ({
	intl,
  violenceScores,
  yLabelText,
  xLabelText,
  range,
  getLabelText,
  labelFontSize = 14,
  color,
  grades,
  gradesLabels = true,
  onClick
}) {
  function getBarScoreText (s) {
    if (!s || !s.mean) {
			return intl.formatMessage(rootMessages.labels.abbrev.notAvailable)
    }
    return `${parseFloat(s.mean).toFixed(1)}`
  }

  return (
    <Flex direction='column' width='100%'>
      <ChartTop
        color={color}
        yLabelText={yLabelText}
        xLabelText={xLabelText}
        range={range}
      />
      {map(violenceScores, (c, k) => {
        const bandStart = c ? c.lobound_10 * 10 : 0
        const bandWidth = c
          ? Math.min(c.upbound_90 * 10, 100) - Math.max(c.lobound_10 * 10, 0)
          : 0
        const bandMean = c ? c.mean * 10 : 0
        return (
          <Button
            variant='chartRow'
            onClick={() => onClick(c)}
            sx={{
              ':hover .band': {
                bg: `${color}Active`,
                opacity: 0.5
              },
              ':hover .band-tooltips': {
                display: 'flex'
              }
            }}
          >
            <Flex
              align='center'
              justify='space-between'
              width='100%'
              whiteSpace='normal'
            >
              <Flex pe={4} justify='start' width={44} minW={44}>
                <Text
                  textAlign='start'
                  fontSize={labelFontSize}
                  fontWeight='600'
                  color={`${color}Dark`}
                >
									{getLabelText(c.metric_code)}
                </Text>
              </Flex>
              <Flex
                py={1}
                align='center'
                alignSelf='stretch' // N.B. not sure why this is necessary compared to height="100%", but seems to be
                width='100%'
                borderLeft='solid 1px grey'
                borderRight='solid 1px grey'
              >
                <Flex
                  position='relative'
                  align='center'
                  width='100%'
                  height={4}
                >
                  {c && bandStart && bandWidth && bandMean ? (
                    <>
                      <Box width='100%' height='1px' bg='dark' opacity='0.3' />
                      <Box
                        // className="band"
                        position='absolute'
                        left={`${bandStart}%`}
                        width={`${bandWidth}%`}
                        height={4}
                        // bg={color}
                        // opacity='0.35'
                      >
                        <Box
                          className='band'
                          width='100%'
                          height='100%'
                          bg={color}
                          opacity='0.35'
                        />
                        <Flex
                          className='band-tooltips'
                          display='none'
                          position='absolute'
                          bottom='100%'
                          left='50%'
                          transform='translateX(-50%)'
                          mb={1}
                          justify='space-between'
                          width='100%'
                          minW={28}
                        >
                          <Flex
                            me={2}
                            p={1}
                            align='center'
                            bg='white'
                            boxShadow='rgba(0, 0, 0, 0.2) 0px 4px 8px'
                          >
                            <Text color={color} fontSize={13}>
                              {parseFloat(c.lobound_10).toFixed(1)}
                            </Text>
                          </Flex>
                          <Flex
                            p={1.5}
                            align='center'
                            bg='white'
                            boxShadow='rgba(0, 0, 0, 0.2) 0px 4px 8px'
                          >
                            <Text color={color} fontWeight='700' fontSize={16}>
                              {parseFloat(c.mean).toFixed(1)}
                            </Text>
                          </Flex>
                          <Flex
                            ms={2}
                            p={1}
                            align='center'
                            bg='white'
                            boxShadow='rgba(0, 0, 0, 0.2) 0px 4px 8px'
                          >
                            <Text color={color} fontSize={13}>
                              {parseFloat(c.upbound_90).toFixed(1)}
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                      <Box
                        position='absolute'
                        ms='-1.5px'
                        left={`${bandMean}%`}
                        width='3px'
                        height={5}
                        bg={`${color}Dark`}
                      />
                    </>
                  ) : (
                    <Box ms={1}>
                      <Text fontStyle='italic' fontSize={13} color={color}>
                        {/* {t(`hrmi.charts.noData`)} */}
												no data
                      </Text>
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Box ps={4} minW={14}>
                <Text fontSize={14} fontWeight='600' color={color}>
                  {getBarScoreText(c)}
                </Text>
              </Box>
            </Flex>
          </Button>
        )
      })}
      <Flex width='100%'>
        <Box pe={4} width={44} minW={44} />
        <Flex justify='space-between' width='100%'>
          <Flex align='center'>
            <ChevronLeftIcon boxSize={4} />
            <Text fontSize={13}>
							<FormattedMessage {...rootMessages.pacific.lessSafe} />
						</Text>
          </Flex>
          <Flex align='center'>
            <Text fontSize={13}>
							<FormattedMessage {...rootMessages.pacific.moreSafe} />
						</Text>
            <ChevronRightIcon boxSize={4} />
          </Flex>
        </Flex>
        <Box ps={4} minW={14} />
      </Flex>
    </Flex>
  )
}

export default injectIntl(PacificViolenceBoxPlotChart);