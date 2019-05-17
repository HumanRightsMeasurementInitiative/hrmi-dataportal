/**
 *
 * CountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Heading, Box } from 'grommet';

import CountrySummaryChart from 'components/CountrySummaryChart';
import CountryNarrative from 'components/CountryNarrative';

import { needsArticle, isPlural } from 'utils/narrative';

import messages from './messages';

const Styled = styled(Box)`
  margin: 0 auto;
  max-width: 1000px;
`;

function CountryReport({
  countryTitle,
  dimensions,
  rights,
  scale,
  benchmark,
  indicators,
  country,
  onMetricClick,
  intl,
  atRiskData,
  onAtRiskClick,
}) {
  return (
    <Styled pad="medium">
      <Heading level={2}>
        <FormattedMessage
          {...messages.title}
          values={{
            country: countryTitle,
            isPlural: isPlural(intl.locale, country.country_code),
            needsArticle: needsArticle(intl.locale, country.country_code),
          }}
        />
      </Heading>
      <CountrySummaryChart
        scale={scale}
        dimensions={dimensions}
        rights={rights}
        benchmark={benchmark}
      />
      <CountryNarrative
        dimensions={dimensions}
        rights={rights}
        indicators={indicators}
        country={country}
        benchmark={benchmark}
        onMetricClick={onMetricClick}
        atRiskData={atRiskData}
        onAtRiskClick={onAtRiskClick}
      />
    </Styled>
  );
}

CountryReport.propTypes = {
  countryTitle: PropTypes.string,
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryReport);
