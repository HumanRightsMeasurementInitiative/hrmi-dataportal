/**
 *
 * CountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import { Heading } from 'grommet';

import CountrySummaryChart from 'components/CountrySummaryChart';
import CountryNarrative from 'components/CountryNarrative';
import messages from './messages';

const Styled = styled.div`
  max-width: 1000px;
  padding: 0 50px;
`;

function CountryReport({
  countryTitle,
  dimensions,
  rights,
  scale,
  benchmark,
  indicators,
  indicatorDetails,
  country,
}) {
  return (
    <Styled>
      <Heading level={2}>
        <FormattedMessage
          {...messages.title}
          values={{
            country: countryTitle,
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
        indicatorDetails={indicatorDetails}
        country={country}
        benchmark={benchmark}
      />
    </Styled>
  );
}

CountryReport.propTypes = {
  countryTitle: PropTypes.string,
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicatorDetails: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CountryReport;
