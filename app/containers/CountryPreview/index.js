/**
 *
 * CountryPreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
import { Button, Box } from 'grommet';

import rootMessages from 'messages';
import formatScore from 'utils/format-score';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getScaleSearch,
  // getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { selectCountry } from 'containers/App/actions';
import { BENCHMARKS } from 'containers/App/constants';

// import messages from './messages';

const noDataMessage = data => {
  if (!data) return 'No data';
  if (data.hasScoreAlternate) {
    return 'Incomplete data (change standard)';
  }
  if (data.hasScoreRights) {
    return 'Incomplete data (explore underlying rights)';
  }
  if (data.hasScoreIndicators) {
    return 'Incomplete data (explore underlying indicators)';
  }
  if (data.hasScoreAlternateRights) {
    return 'Incomplete data (change standard & explore underlying rights)';
  }
  if (data.hasScoreIndicatorsAlternate) {
    return 'Incomplete data (change standard & explore underlying indicators)';
  }
  return 'No data';
};

export function CountryPreview({
  onSelectCountry,
  country,
  rights,
  dimensions,
  scale,
  // standard,
  benchmark,
}) {
  // return null;
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const empower = dimensions && dimensions.empowerment.score;
  const physint = dimensions && dimensions.physint.score;
  const esr = dimensions && dimensions.esr.score;
  return (
    <Box pad="medium">
      {country && (
        <Button onClick={() => onSelectCountry(country.country_code)}>
          <strong>
            <FormattedMessage
              {...rootMessages.countries[country.country_code]}
            />
          </strong>
          {scale === 'd' && (
            <div>
              <div>
                {`Empowerment: ${
                  empower ? formatScore(empower.mean) : 'No data'
                }`}
              </div>
              <div>
                {`Physical integrity: ${
                  empower ? formatScore(physint.mean) : 'No data'
                }`}
              </div>
              <div>
                <span>Quality of life: </span>
                {esr
                  ? formatScore(esr[currentBenchmark.column])
                  : noDataMessage(dimensions.esr)}
              </div>
            </div>
          )}
          {scale === 'r' &&
            rights &&
            Object.values(rights)
              .filter(
                r => r.type === 'cpr' && typeof r.aggregate === 'undefined',
              )
              .map(r => (
                <div key={r.key}>
                  <FormattedMessage {...rootMessages['rights-short'][r.key]} />
                  <span>: </span>
                  {r.score ? formatScore(r.score.mean) : 'No data'}
                </div>
              ))}
          {scale === 'r' &&
            rights &&
            Object.values(rights)
              .filter(r => r.type === 'esr')
              .map(r => (
                <div key={r.key}>
                  <FormattedMessage {...rootMessages['rights-short'][r.key]} />
                  <span>: </span>
                  {r.score
                    ? formatScore(r.score[currentBenchmark.column])
                    : noDataMessage(r)}
                </div>
              ))}
        </Button>
      )}
    </Box>
  );
}

CountryPreview.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onSelectCountry: PropTypes.func,
  country: PropTypes.object,
  rights: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dimensions: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  rights: (state, { country }) =>
    getRightsForCountry(state, country.country_code),
  dimensions: (state, { country }) =>
    getDimensionsForCountry(state, country.country_code),
  scale: state => getScaleSearch(state),
  // standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: country => dispatch(selectCountry(country)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CountryPreview);
