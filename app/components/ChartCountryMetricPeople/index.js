/**
 *
 * ChartCountryMetricPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paragraph, Box } from 'grommet';
import ReactMarkdown from 'react-markdown';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// import HTMLWrapper from 'components/HTMLWrapper';
import Loading from 'components/LoadingIndicator';
import ChartWordCloud from 'components/ChartWordCloud';
import Hint from 'styled/Hint';

import messages from './messages';

const Styled = styled(Box)``;

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

        {/* eslint-disable react/no-children-prop */}
        <ReactMarkdown children={atRiskAnalysis.content} />
        {/* eslint-enable react/no-children-prop */}
        {/* <HTMLWrapper innerhtml={atRiskAnalysis.content} /> */}
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
  const hasSubrights = data && Object.keys(data).length > 1;
  return (
    <Styled
      pad={showIntro || hasSubrights ? { vertical: 'medium' } : null}
      direction="column"
    >
      {metric.metricType === 'rights' && (
        <Box>
          {showIntro && (
            <Paragraph>
              <FormattedMessage {...messages.introRight} />
            </Paragraph>
          )}
          <Box pad={showIntro ? { top: 'medium' } : null}>
            {Object.values(data).map((d, index) => {
              const analysisSR =
                hasSubrightAnalysis &&
                atRiskAnalysisSubrights.find(sra => sra.key === d.subright);
              return (
                <span key={d.code}>
                  <ChartWordCloud
                    data={d}
                    dimension={metric.dimension}
                    showTitle={hasSubrights}
                    border={showIntro || (hasSubrights && index > 0)}
                  />
                  {analysisSR && renderAnalysis(analysisSR, intl)}
                </span>
              );
            })}
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
