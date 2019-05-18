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
import { Button, Box, Text } from 'grommet';

import rootMessages from 'messages';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getScaleSearch,
  // getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { selectCountry } from 'containers/App/actions';
// import { BENCHMARKS, COLUMNS } from 'containers/App/constants';

import DiamondChart from './DiamondChart';
import messages from './messages';

export function CountryPreview({
  onSelectCountry,
  country,
  rights,
  dimensions,
  scale,
  // standard,
  benchmark,
}) {
  if (!dimensions || !rights || !country) return null;
  // return null;
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  // const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const empowerScore = dimensions && dimensions.empowerment.score;
  // const physintScore = dimensions && dimensions.physint.score;
  // const esrScore = dimensions && dimensions.esr.score;
  // country && dimensions && console.log(country.country_code, esrScore, dimensions.esr);
  return (
    <Box pad="small" width="200px" alignContent="center">
      {country && (
        <Button onClick={() => onSelectCountry(country.country_code)}>
          {scale === 'd' && (
            <div>
              <DiamondChart dimensions={dimensions} benchmark={benchmark} />
            </div>
          )}
          {scale === 'r' && (
            <div>
              <DiamondChart rights={rights} benchmark={benchmark} />
            </div>
          )}
          <Box>
            <Text textAlign="center" alignSelf="center">
              <strong>
                <FormattedMessage
                  {...rootMessages.countries[country.country_code]}
                />
                {country.high_income_country === '1' && (
                  <FormattedMessage {...messages.hi} />
                )}
              </strong>
            </Text>
          </Box>
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
