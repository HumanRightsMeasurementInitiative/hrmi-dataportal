/**
 *
 * ChartCountryMetricPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Paragraph, Box } from 'grommet';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import HTMLWrapper from 'components/HTMLWrapper';
import Loading from 'components/LoadingIndicator';
import ChartWordCloud from 'components/ChartWordCloud';
import Hint from 'styled/Hint';

import messages from './messages';

const Styled = styled(Box)``;

const RightHeading = props => (
  <Heading
    responsive={false}
    level={4}
    margin={{ vertical: '15px' }}
    {...props}
  />
);
const StyledRightHeading = styled(RightHeading)``;

const renderAnalysis = (atRiskAnalysis, intl) => (
  <Box>
    {atRiskAnalysis && atRiskAnalysis.content && (
      <>
        {atRiskAnalysis.locale !== intl.locale && (
          <Paragraph>
            <Hint italic>
              <FormattedMessage {...messages.noAnalysisInLanguage} />
            </Hint>
          </Paragraph>
        )}
        <HTMLWrapper innerhtml={atRiskAnalysis.content} />
      </>
    )}
    {(!atRiskAnalysis || !atRiskAnalysis.content) && <Loading />}
  </Box>
);

function ChartCountryMetricPeople({
  data,
  metric,
  atRiskAnalysis,
  atRiskAnalysisSubrights,
  intl,
  hasAnalysis,
  hasSubrightAnalysis,
  showIntro,
}) {
  return (
    <Styled pad={showIntro ? { vertical: 'medium' } : null} direction="column">
      {metric.metricType === 'rights' && (
        <Box>
          {showIntro && (
            <Paragraph>
              <FormattedMessage {...messages.introRight} />
            </Paragraph>
          )}
          <Box pad={showIntro ? { top: 'medium' } : null}>
            {Object.values(data).map((d, index, array) => {
              const analysisSR =
                hasSubrightAnalysis &&
                atRiskAnalysisSubrights.find(sra => sra.key === d.subright);
              return (
                <span key={d.code}>
                  <ChartWordCloud
                    data={d}
                    dimension={metric.dimension}
                    showTitle={array.length > 1}
                    border={showIntro}
                  />
                  {analysisSR && renderAnalysis(analysisSR, intl)}
                </span>
              );
            })}
          </Box>
        </Box>
      )}
      {metric.metricType === 'dimensions' && (
        <Box>
          <Paragraph>
            <FormattedMessage {...messages.introDimension} />
          </Paragraph>
          <Box pad={{ top: 'medium' }}>
            {Object.values(data).map(i => (
              <div key={i.key}>
                {Object.values(i.atRiskData).length > 1 && (
                  <StyledRightHeading>
                    <FormattedMessage {...rootMessages.rights[i.key]} />
                  </StyledRightHeading>
                )}
                {Object.values(i.atRiskData).map((d, index, array) => (
                  <ChartWordCloud
                    key={d.code}
                    data={d}
                    dimension={i.dimension}
                    subright={array.length > 1}
                  />
                ))}
              </div>
            ))}
          </Box>
        </Box>
      )}
      {hasAnalysis &&
        !hasSubrightAnalysis &&
        renderAnalysis(atRiskAnalysis, intl)}
    </Styled>
  );
}

ChartCountryMetricPeople.propTypes = {
  showIntro: PropTypes.bool,
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

export default injectIntl(ChartCountryMetricPeople);
