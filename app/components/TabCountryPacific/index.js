/**
 *
 * TabCountryPacific
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { ResponsiveContext, Button, Text as GText } from 'grommet';
import { CircleQuestion } from 'grommet-icons';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import rootMessages from 'messages';
import { isMinSize } from 'utils/responsive';
import messages from './messages';

import PacificIssue from '../PacificIssue';
import PacificViolenceBoxPlotChart from '../PacificViolenceBoxPlotChart';

// prettier-ignore
const StyledText = styled(GText)`
  border-bottom: 3px solid
    ${({ theme, hasWhiteBG = true }) =>
    hasWhiteBG
      ? theme.global.colors.buttonSecondaryOnWhiteHover
      : theme.global.colors.buttonSecondaryHover};
`;
const StyledButton = styled(Button)`
  background: transparent;
  padding: 3px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xxsmall};
  font-weight: 600;
  &:last-child {
    margin-right: 0;
    padding-right: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 3px 10px;
  }
`;

function TabCountryPacific({
  intl,
  data,
  messageValues,
  content,
  countryCode,
  onSetAsideLayer,
  onMetricClick,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Box mt={16}>
            {!(
              (intl.locale === 'fr' &&
                (countryCode === 'PYF' ||
                  countryCode === 'NCL' ||
                  countryCode === 'WLF' ||
                  countryCode === 'VUT')) ||
              intl.locale === 'en'
            ) && (
              <Text mb={4} fontStyle="italic">
                <FormattedMessage {...messages.apology} />
              </Text>
            )}
            <Text>
              <FormattedMessage {...rootMessages.pacific.intro} />
            </Text>
          </Box>
          <Flex mt={4} mb={8} justify="space-between" width="100%">
            <Text fontWeight="600" color="purple">
              <FormattedMessage {...rootMessages.pacific.jump} />
            </Text>
            <a
              mx={2}
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#climate-crisis`}
            >
              <Text fontWeight="600" color="purple">
                <FormattedMessage {...rootMessages.pacific['climate-crisis']} />
              </Text>
            </a>
            <Box
              borderRightStyle="solid"
              borderRightWidth="2px"
              borderRightColor="purple"
            />
            <a
              mx={2}
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#indigenous-sovereignty`}
            >
              <Text fontWeight="600" color="purple">
                <FormattedMessage
                  {...rootMessages.pacific['indigenous-sovereignty']}
                />
              </Text>
            </a>
            <Box
              borderRightStyle="solid"
              borderRightWidth="2px"
              borderRightColor="purple"
            />
            <a
              mx={2}
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#indigenous-lands`}
            >
              <Text fontWeight="600" color="purple">
                <FormattedMessage
                  {...rootMessages.pacific['indigenous-lands']}
                />
              </Text>
            </a>
            <Box
              borderRightStyle="solid"
              borderRightWidth="2px"
              borderRightColor="purple"
            />
            <a
              mx={2}
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#cultural-rights`}
            >
              <Text fontWeight="600" color="purple">
                <FormattedMessage
                  {...rootMessages.pacific['cultural-rights']}
                />
              </Text>
            </a>
            <Box
              borderRightStyle="solid"
              borderRightWidth="2px"
              borderRightColor="purple"
            />
            <a
              mx={2}
              href={`${window.location.origin}${window.location.pathname}${
                window.location.search
              }#violence`}
            >
              <Text fontWeight="600" color="purple">
                <FormattedMessage {...rootMessages.pacific.violence} />
              </Text>
            </a>
          </Flex>
          <PacificIssue
            year={data.find(d => d.metric_code === 'climate').year}
            issueTKeyPart="climate-crisis"
            countryWithPrepositionedArticle={
              messageValues.countryWithPrepositionedArticle
            }
            score={data.find(d => d.metric_code === 'climate').mean}
            qualData={
              content[`climate/${countryCode}`] &&
              content[`climate/${countryCode}`].content
            }
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
            countryWithPrepositionedArticle={
              messageValues.countryWithPrepositionedArticle
            }
            score={data.find(d => d.metric_code === 'indigsov').mean}
            qualData={
              content[`indigsov/${countryCode}`] &&
              content[`indigsov/${countryCode}`].content
            }
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
            countryWithPrepositionedArticle={
              messageValues.countryWithPrepositionedArticle
            }
            score={data.find(d => d.metric_code === 'indigland').mean}
            qualData={
              content[`indigland/${countryCode}`] &&
              content[`indigland/${countryCode}`].content
            }
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
            countryWithPrepositionedArticle={
              messageValues.countryWithPrepositionedArticle
            }
            score={data.find(d => d.metric_code === 'culture').mean}
            qualData={
              content[`culture/${countryCode}`] &&
              content[`culture/${countryCode}`].content
            }
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

          <Flex position="relative" mb={12} direction="column" width="100%">
            {/* HACK to get the 'jump to' hash links to scroll to the appropriate location */}
            <Box
              id="violence"
              position="absolute"
              visibility="hidden"
              top={-164}
            />
            <Flex justify="space-between">
              <Heading fontSize={24} fontWeight="600" color="purple">
                <FormattedMessage {...rootMessages.pacific.violence} />
              </Heading>
              <StyledButton
                onClick={() => {
                  onSetAsideLayer({
                    type: 'htr',
                    key: 'country-indicators',
                    chart: 'Bullet',
                    dimension: 'physint',
                    pacific: true,
                  });
                }}
                icon={<CircleQuestion color="dark" size="large" />}
                plain
                label={
                  isMinSize(size, 'medium') ? (
                    <StyledText hasWhiteBG>
                      {intl.formatMessage(
                        rootMessages.labels.chartTools.howToRead,
                      )}
                    </StyledText>
                  ) : null
                }
                gap="xsmall"
                reverse
              />
            </Flex>
            <Box mt={2}>
              <Text color="purple">
                {/* {t(`hrmi.pacific.violence-subheading`, { countryWithArticle })} */}
                <FormattedMessage
                  {...{
                    ...rootMessages.pacific['violence-subheading'],
                    values: messageValues,
                  }}
                />
              </Text>
            </Box>
            <Box mt={4} width="100%">
              <PacificViolenceBoxPlotChart
                violenceScores={data.filter(d =>
                  ['vchild', 'vdisab', 'vwomen', 'vmvpfaff'].includes(
                    d.metric_code,
                  ),
                )}
                yLabelText={intl.formatMessage(
                  rootMessages.pacific['violence-against'],
                )}
                xLabelText={intl.formatMessage(rootMessages.labels.score)}
                range={['0', '10']}
                getLabelText={k => intl.formatMessage(rootMessages.pacific[k])}
                color="physint"
                onClick={c => onMetricClick(c.metric_code)}
              />
            </Box>
            <Box mt={6}>
              <Heading fontSize={18} fontWeight="600" color="purple">
                <FormattedMessage
                  {...rootMessages.pacific['violence-children']}
                />
              </Heading>
              <ReactMarkdown
                /* eslint-disable */
                children={
                  content[`vchild/${countryCode}`] &&
                  content[`vchild/${countryCode}`].content
                }
                /* eslint-enable */
              />
            </Box>
            <Box mt={6}>
              <Heading fontSize={18} fontWeight="600" color="purple">
                <FormattedMessage
                  {...rootMessages.pacific['violence-disabled']}
                />
              </Heading>
              <ReactMarkdown
                /* eslint-disable */
                children={
                  content[`vdisab/${countryCode}`] &&
                  content[`vdisab/${countryCode}`].content
                }
                /* eslint-enable */
              />
            </Box>
            <Box mt={6}>
              <Heading fontSize={18} fontWeight="600" color="purple">
                <FormattedMessage
                  {...rootMessages.pacific['violence-mvpfaff']}
                />
              </Heading>
              <ReactMarkdown
                /* eslint-disable */
                children={
                  content[`vmvpfaff/${countryCode}`] &&
                  content[`vmvpfaff/${countryCode}`].content
                }
                /* eslint-enable */
              />
            </Box>
            <Box mt={6}>
              <Heading fontSize={18} fontWeight="600" color="purple">
                <FormattedMessage {...rootMessages.pacific['violence-women']} />
              </Heading>
              <ReactMarkdown
                /* eslint-disable */
                children={
                  content[`vwomen/${countryCode}`] &&
                  content[`vwomen/${countryCode}`].content
                }
                /* eslint-enable */
              />
            </Box>
          </Flex>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabCountryPacific.propTypes = {
  messageValues: PropTypes.object,
  hasAside: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setHighlight: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryCode: PropTypes.string,
  intl: intlShape,
  onSelectCountry: PropTypes.func,
  onSetAsideLayer: PropTypes.func,
  onMetricClick: PropTypes.func,
};

export default injectIntl(TabCountryPacific);
