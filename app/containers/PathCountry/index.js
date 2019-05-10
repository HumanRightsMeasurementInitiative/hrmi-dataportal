/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Heading } from 'grommet';

import rootMessages from 'messages';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import H1 from 'styled/H1';
import {
  getDimensionsForCountry,
  getRightsForCountry,
  getIndicatorsForCountry,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';

// import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

export function PathCountry({
  onLoadData,
  match,
  dimensions,
  rights,
  indicators,
}) {
  // useInjectReducer({ key: 'country', reducer });
  // useInjectSaga({ key: 'country', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Country</title>
        <meta name="description" content="Description of Country page" />
      </Helmet>
      <Heading>
        {match.params.country && (
          <FormattedMessage {...rootMessages.countries[match.params.country]} />
        )}
      </Heading>
      <div>Dimensions</div>
      <div>CPR: {dimensions && dimensions.cpr.length}</div>
      <div>ESR: {dimensions && dimensions.esr.length}</div>
      <div>Rights</div>
      <div>CPR: {rights && rights.cpr.length}</div>
      <div>ESR: {rights && rights.esr.length}</div>
      <div>Indicators</div>
      <div>ESR: {indicators && indicators.length}</div>
    </div>
  );
}

PathCountry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  match: PropTypes.object,
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  indicators: (state, { match }) =>
    getIndicatorsForCountry(state, match.params.country),
  rights: (state, { match }) =>
    getRightsForCountry(state, match.params.country),
  dimensions: (state, { match }) =>
    getDimensionsForCountry(state, match.params.country),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathCountry);
