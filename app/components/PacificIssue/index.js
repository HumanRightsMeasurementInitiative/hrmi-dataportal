/**
 *
 * PacificIssue
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { injectIntl, FormattedMessage } from 'react-intl';

import rootMessages from 'messages';

import Loading from 'components/LoadingIndicator';
import SingleBarChart from '../SingleBarChart';

function PacificIssue({
  year,
  issueTKeyPart,
  countryWithPrepositionedArticle,
  score,
  qualData,
  barChartResponseOptions,
  id,
}) {
  return (
    <Flex position="relative" mb={12} direction="column" width="100%">
      {/* HACK to get the 'jump to' hash links to scroll to the appropriate location */}
      <Box id={id} position="absolute" visibility="hidden" top={-144} />
      <Flex direction="column">
        <Heading my={1} fontSize={24} fontWeight="600" color="purple">
          <FormattedMessage {...rootMessages.pacific[issueTKeyPart]} />
        </Heading>
        <Text display="inline" mt={0} fontSize={14} color="purple">
          {' '}
          ({year})
        </Text>
      </Flex>
      <Box mt={2}>
        <Text color="purple">
          <FormattedMessage
            {...{
              ...rootMessages.pacific[`${issueTKeyPart}-subheading`],
              values: { countryWithPrepositionedArticle },
            }}
          />
        </Text>
      </Box>
      <Box my={4}>
        <SingleBarChart
          // @ts-ignore
          score={score}
          responseOptions={barChartResponseOptions}
        />
      </Box>
      {/* eslint-disable */}
      {qualData ? <ReactMarkdown children={qualData} /> : <Loading />}
      {/* eslint-enable */}
    </Flex>
  );
}

PacificIssue.propTypes = {
  year: PropTypes.string,
  issueTKeyPart: PropTypes.string,
  countryWithPrepositionedArticle: PropTypes.string,
  score: PropTypes.string,
  qualData: PropTypes.object,
  barChartResponseOptions: PropTypes.array,
  id: PropTypes.string,
};

export default injectIntl(PacificIssue);
