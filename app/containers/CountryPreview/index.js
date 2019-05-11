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
import roundScore from 'utils/round-score';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { selectCountry } from 'containers/App/actions';
import { STANDARDS, BENCHMARKS, RIGHTS } from 'containers/App/constants';

// import messages from './messages';

export function CountryPreview({
  onSelectCountry,
  country,
  rights,
  dimensions,
  scale,
  standard,
  benchmark,
}) {
  const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const empower =
    dimensions && dimensions.cpr.find(s => s.metric_code === 'empower');
  const physint =
    dimensions && dimensions.cpr.find(s => s.metric_code === 'physint');
  const esr =
    dimensions &&
    dimensions.esr.find(
      s =>
        s.metric_code === 'SER_Average' && s.standard === currentStandard.code,
    );
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
              {empower && (
                <div>{`Empowerment: ${roundScore(empower.mean)}`}</div>
              )}
              {physint && (
                <div>{`Physical integrity: ${roundScore(physint.mean)}`}</div>
              )}
              {esr && (
                <div>
                  {`Quality of life: ${roundScore(
                    esr[currentBenchmark.column],
                  )}`}
                </div>
              )}
            </div>
          )}
          {scale === 'r' &&
            rights &&
            rights.cpr.map(s => {
              const metricDetails = RIGHTS.find(r => r.code === s.metric_code);
              return (
                <div>
                  <FormattedMessage
                    {...rootMessages['rights-short'][metricDetails.key]}
                  />
                  <span>{`: ${roundScore(s.mean)}`}</span>
                </div>
              );
            })}
          {scale === 'r' &&
            rights &&
            rights.esr.map(s => {
              const metricDetails = RIGHTS.find(r => r.code === s.metric_code);
              return (
                <div>
                  <FormattedMessage
                    {...rootMessages['rights-short'][metricDetails.key]}
                  />
                  <span>{`: ${roundScore(s[currentBenchmark.column])}`}</span>
                </div>
              );
            })}
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
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  rights: (state, { country }) =>
    getRightsForCountry(state, country.country_code),
  dimensions: (state, { country }) =>
    getDimensionsForCountry(state, country.country_code),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
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
