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

const renderAnalysis = (atRiskAnalysis, intl) => (
  <Box>
    {atRiskAnalysis && atRiskAnalysis.content && (
      <span>
        {atRiskAnalysis.locale !== intl.locale && (
          <Paragraph>
            <FormattedMessage {...messages.noAnalysisInLanguage} />
          </Paragraph>
        )}
        <HTMLWrapper innerhtml={atRiskAnalysis.content} />
      </span>
    )}
    {(!atRiskAnalysis || !atRiskAnalysis.content) && <Loading />}
  </Box>
);

function CountryMetricPeople({
  data,
  metric,
  atRiskAnalysis,
  atRiskAnalysisSubrights,
  intl,
  hasAnalysis,
  hasSubrightAnalysis,
}) {
  return (
    <Styled pad="medium" direction="column">
      {metric.metricType === 'rights' && (
        <Box>
          <Paragraph>
            <FormattedMessage {...messages.introRight} />
          </Paragraph>
          {Object.values(data).map((d, index, array) => {
            const analysisSR =
              hasSubrightAnalysis &&
              atRiskAnalysisSubrights.find(sra => sra.key === d.subright);
            return (
              <span key={d.code}>
                <WordCloud
                  data={d}
                  dimension={metric.dimension}
                  showTitle={array.length > 1}
                />
                {analysisSR && renderAnalysis(analysisSR, intl)}
              </span>
            );
          })}
        </Box>
      )}
      {metric.metricType === 'dimensions' && (
        <Box>
          <Paragraph>
            <FormattedMessage {...messages.introDimension} />
          </Paragraph>
          {Object.values(data).map(i => (
            <div key={i.key}>
              {Object.values(i.atRiskData).length > 1 && (
                <StyledRightHeading>
                  <FormattedMessage {...rootMessages.rights[i.key]} />
                </StyledRightHeading>
              )}
              {Object.values(i.atRiskData).map((d, index, array) => (
                <WordCloud
                  key={d.code}
                  data={d}
                  dimension={i.dimension}
                  subright={array.length > 1}
                />
              ))}
            </div>
          ))}
        </Box>
      )}
      {hasAnalysis &&
        !hasSubrightAnalysis &&
        renderAnalysis(atRiskAnalysis, intl)}
    </Styled>
  );
}

CountryMetricPeople.propTypes = {
  hasAnalysis: PropTypes.bool,
  hasSubrightAnalysis: PropTypes.bool,
  metric: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysisSubrights: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryMetricPeople);
