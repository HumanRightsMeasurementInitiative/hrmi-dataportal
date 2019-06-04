/**
 *
 * CountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Heading } from 'grommet';

import CountrySummaryChart from 'components/CountrySummaryChart';
import CountryNarrative from 'components/CountryNarrative';
import LoadingIndicator from 'components/LoadingIndicator';
import MainColumn from 'styled/MainColumn';

import { needsArticle, isPlural } from 'utils/narrative';

import messages from './messages';

function CountryReport({
  countryTitle,
  dimensions,
  rights,
  scale,
  benchmark,
  standard,
  indicators,
  country,
  onMetricClick,
  intl,
  atRiskData,
  onAtRiskClick,
  reference,
  esrYear,
  cprYear,
  dataReady,
}) {
  return (
    <MainColumn>
      {!dataReady && <LoadingIndicator />}
      {dataReady && (
        <>
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
            standard={standard}
            esrYear={esrYear}
            cprYear={cprYear}
          />
          <CountryNarrative
            dimensions={dimensions}
            rights={rights}
            indicators={indicators}
            country={country}
            benchmark={benchmark}
            standard={standard}
            onMetricClick={onMetricClick}
            atRiskData={atRiskData}
            onAtRiskClick={onAtRiskClick}
            reference={reference}
            esrYear={esrYear}
            cprYear={cprYear}
          />
        </>
      )}
    </MainColumn>
  );
}

CountryReport.propTypes = {
  countryTitle: PropTypes.string,
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  dataReady: PropTypes.bool,
};

export default injectIntl(CountryReport);
