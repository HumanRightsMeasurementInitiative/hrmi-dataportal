import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from '@chakra-ui/react';
import { injectIntl, intlShape } from 'react-intl';

import rootMessages from 'messages';

function GradeAndLabel({ left, text, value }) {
  return (
    <Box
      position="absolute"
      left={left}
      height={6}
      borderLeftStyle="solid"
      borderLeftWidth="1px"
      borderLeftColor="dark"
    >
      <Box
        position="absolute"
        top="100%"
        mt={1}
        transform="translate(-50%)"
        minW={16}
      >
        <Text mb={0} textAlign="center">
          {text}
        </Text>
        <Text mt={0} textAlign="center">
          {`(${value})`}
        </Text>
      </Box>
    </Box>
  );
}

GradeAndLabel.propTypes = {
  left: PropTypes.number,
  text: PropTypes.string,
  value: PropTypes.string,
};

function SingleBarChart({ intl, score, responseOptions }) {
  return (
    <Flex mt={8} mb={24} px={12} width="100%" height={6}>
      <Box
        position="relative"
        width="100%"
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        borderBottomColor="dark"
      >
        <Box
          position="absolute"
          left={`${(score / (responseOptions.length - 1)) * 100 -
            100 / (responseOptions.length - 1)}%`}
          height={7}
          borderLeftStyle="solid"
          borderLeftWidth="2px"
          borderLeftColor="red"
        >
          <Box
            position="absolute"
            bottom="100%"
            mb={2}
            px={2}
            transform="translate(-50%)"
            bg="white"
            borderRadius="sm"
            boxShadow="rgba(0, 0, 0, 0.2) 0px 2px 4px"
          >
            <Text fontWeight="600" color="purple">
              {parseFloat(score).toFixed(1)}
            </Text>
          </Box>
        </Box>

        {responseOptions.map((o, i) => (
          <GradeAndLabel
            left={`${(100 / (responseOptions.length - 1)) * i}%`}
            text={intl.formatMessage(rootMessages.pacific[o.tKey])}
            value={o.value}
          />
        ))}
      </Box>
    </Flex>
  );
}

SingleBarChart.propTypes = {
  intl: intlShape.isRequired,
  score: PropTypes.number,
  responseOptions: PropTypes.array,
};

export default injectIntl(SingleBarChart);
