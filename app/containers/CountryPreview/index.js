/**
 *
 * CountryPreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
import { Button, Box } from 'grommet';

import rootMessages from 'messages';
import formatScore from 'utils/format-score';
import { getNoDataMessage, getIncompleteDataActionMessage } from 'utils/scores';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getScaleSearch,
  // getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { selectCountry } from 'containers/App/actions';
import { BENCHMARKS, COLUMNS } from 'containers/App/constants';

// import messages from './messages';

export function CountryPreview({
  onSelectCountry,
  country,
  rights,
  dimensions,
  scale,
  // standard,
  benchmark,
  intl,
}) {
  if (!dimensions || !rights || !country) return null;
  // return null;
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const empowerScore = dimensions && dimensions.empowerment.score;
  const physintScore = dimensions && dimensions.physint.score;
  const esrScore = dimensions && dimensions.esr.score;
  // country && dimensions && console.log(country.country_code, esrScore, dimensions.esr);
  return (
    <Box pad="small" width="270px">
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
                <FormattedMessage {...rootMessages.dimensions.empowerment} />
                <span>: </span>
                {empowerScore && (
                  <strong>{formatScore(empowerScore[COLUMNS.CPR.MEAN])}</strong>
                )}
                {!empowerScore &&
                  getNoDataMessage(intl, dimensions.empowerment)}
              </div>
              <div>
                <FormattedMessage {...rootMessages.dimensions.physint} />
                <span>: </span>
                {physintScore && (
                  <strong>{formatScore(physintScore[COLUMNS.CPR.MEAN])}</strong>
                )}
                {!physintScore && getNoDataMessage(intl, dimensions.physint)}
              </div>
              <div>
                <FormattedMessage {...rootMessages.dimensions.esr} />
                <span>: </span>
                {esrScore && (
                  <strong>
                    {formatScore(esrScore[currentBenchmark.column])}
                  </strong>
                )}
                {!esrScore && getNoDataMessage(intl, dimensions.esr)}
                {!esrScore &&
                  getIncompleteDataActionMessage(intl, dimensions.esr)}
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
                  {r.score && (
                    <strong>{formatScore(r.score[COLUMNS.CPR.MEAN])}</strong>
                  )}
                  {!r.score && getNoDataMessage(intl, r)}
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
                  {r.score && (
                    <strong>
                      {formatScore(r.score[currentBenchmark.column])}
                    </strong>
                  )}
                  {!r.score && getNoDataMessage(intl, r)}
                  {!r.score && getIncompleteDataActionMessage(intl, r)}
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
  intl: intlShape.isRequired,
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

export default compose(withConnect)(injectIntl(CountryPreview));
