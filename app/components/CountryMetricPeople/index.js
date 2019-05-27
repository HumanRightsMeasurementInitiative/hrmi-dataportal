/**
 *
 * CountryMetricPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Paragraph, Box } from 'grommet';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import HTMLWrapper from 'components/HTMLWrapper';
import Loading from 'components/Loading';
import WordCloud from 'components/WordCloud';

import messages from './messages';

const Styled = styled(Box)``;

const RightHeading = props => (
  <Heading level={4} margin={{ vertical: '15px' }} {...props} />
);
const StyledRightHeading = styled(RightHeading)`
  font-weight: normal;
`;

function CountryMetricPeople({
  data,
  metric,
  atRiskAnalysis,
  intl,
  hasAnalysis,
}) {
  return (
    <Styled pad="medium" direction="column">
      {metric.metricType === 'rights' && (
        <Box>
          <Paragraph>
            <FormattedMessage {...messages.introRight} />
          </Paragraph>
          {Object.values(data).map((d, index, array) => (
            <WordCloud
              key={d.code}
              data={d}
              dimension={metric.dimension}
              showTitle={array.length > 1}
            />
          ))}
        </Box>
      )}
      {metric.metricType === 'dimensions' && (
        <Box>
          <Paragraph>
            <FormattedMessage {...messages.introDimension} />
          </Paragraph>
          {Object.values(data).map(i => (
            <div key={i.key}>
              <StyledRightHeading>
                <FormattedMessage {...rootMessages.rights[i.key]} />
              </StyledRightHeading>
              {Object.values(i.atRiskData).map((d, index, array) => (
                <WordCloud
                  key={d.code}
                  data={d}
                  dimension={i.dimension}
                  showTitle={array.length > 1}
                />
              ))}
            </div>
          ))}
        </Box>
      )}
      {hasAnalysis && (
        <Box>
          {atRiskAnalysis && (
            <span>
              {atRiskAnalysis.locale !== intl.locale && (
                <Paragraph>
                  <FormattedMessage {...messages.noAnalysisInLanguage} />
                </Paragraph>
              )}
              <HTMLWrapper innerhtml={atRiskAnalysis.content} />
            </span>
          )}
          {!atRiskAnalysis && <Loading />}
        </Box>
      )}
    </Styled>
  );
}

CountryMetricPeople.propTypes = {
  hasAnalysis: PropTypes.bool,
  metric: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryMetricPeople);
