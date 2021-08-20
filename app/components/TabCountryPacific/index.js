/**
 *
 * TabCountryPacific
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import {
  Flex,
  Box,
  Text,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

import {
  // Heading,
  Paragraph,
  // Box,
  // Text,
  ResponsiveContext,
  Button,
  Drop,
} from 'grommet';
import { Up, Down, FormDown, FormUp } from 'grommet-icons';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import PacificIssue from '../PacificIssue';

// // prettier-ignore
// const StyledHeading = styled(Heading)`
//   font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
//   line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//     font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
//     line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
//   }
// `;
function TabCountryPacific({
  data,
  messageValues,
  highlight,
  setHighlight,
  content,
  countryCode,
  intl,
  onSelectCountry,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <PacificIssue
            year={data.find(d => d.metric_code === 'climate').year}
            issueTKeyPart="climate-crisis"
            countryWithArticle={messageValues.countryWithArticle}
            score={data.find(d => d.metric_code === 'climate').mean}
            qualData={content[`climate/${countryCode}`].content}
            barChartResponseOptions={[
              { value: 1, tKey: 'not-at-all' },
              { value: 2, tKey: 'slightly' },
              { value: 3, tKey: 'somewhat' },
              { value: 4, tKey: 'moderately' },
              { value: 5, tKey: 'greatly' },
              { value: 6, tKey: 'extremely' },
            ]}
            responseCount={
              data.find(d => d.metric_code === 'climate').resp_count
            }
            id="climate-crisis"
          />
          <PacificIssue
            year={data.find(d => d.metric_code === 'indigsov').year}
            issueTKeyPart="indigenous-sovereignty"
            countryWithArticle={messageValues.countryWithArticle}
            score={data.find(d => d.metric_code === 'indigsov').mean}
            qualData={content[`indigsov/${countryCode}`].content}
            barChartResponseOptions={[
              { value: 1, tKey: 'not-at-all' },
              { value: 2, tKey: 'slightly' },
              { value: 3, tKey: 'somewhat' },
              { value: 4, tKey: 'moderately' },
              { value: 5, tKey: 'highly' },
              { value: 6, tKey: 'completely' },
            ]}
            responseCount={
              data.find(d => d.metric_code === 'indigsov').resp_count
            }
            id="indigenous-sovereignty"
          />
          <PacificIssue
            year={data.find(d => d.metric_code === 'indigland').year}
            issueTKeyPart="indigenous-lands"
            countryWithArticle={messageValues.countryWithArticle}
            score={data.find(d => d.metric_code === 'indigland').mean}
            qualData={content[`indigland/${countryCode}`].content}
            barChartResponseOptions={[
              { value: 1, tKey: 'not-at-all' },
              { value: 2, tKey: 'slightly' },
              { value: 3, tKey: 'somewhat' },
              { value: 4, tKey: 'moderately' },
              { value: 5, tKey: 'highly' },
              { value: 6, tKey: 'completely' },
            ]}
            responseCount={
              data.find(d => d.metric_code === 'indigland').resp_count
            }
            id="indigenous-lands"
          />
          <PacificIssue
            year={data.find(d => d.metric_code === 'culture').year}
            issueTKeyPart="cultural-rights"
            countryWithArticle={messageValues.countryWithArticle}
            score={data.find(d => d.metric_code === 'culture').mean}
            qualData={content[`culture/${countryCode}`].content}
            barChartResponseOptions={[
              { value: 1, tKey: 'not-at-all' },
              { value: 2, tKey: 'slightly' },
              { value: 3, tKey: 'somewhat' },
              { value: 4, tKey: 'moderately' },
              { value: 5, tKey: 'highly' },
              { value: 6, tKey: 'completely' },
            ]}
            responseCount={
              data.find(d => d.metric_code === 'culture').resp_count
            }
            id="cultural-rights"
          />
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabCountryPacific.propTypes = {
  hasAside: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setHighlight: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryCode: PropTypes.string,
  intl: intlShape,
  onSelectCountry: PropTypes.func,
};

export default injectIntl(TabCountryPacific);
