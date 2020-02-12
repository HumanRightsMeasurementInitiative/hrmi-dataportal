/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';

// import {
//   getCountriesFiltered,
//   getScoresByCountry,
//   getStandardSearch,
//   getAssessedSearch,
//   getScaleSearch,
//   getDependenciesReady,
//   getAuxIndicatorsLatest,
// } from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';

import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import messages from './messages';

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  // 'esrIndicatorScores', // consider removing to improve IE11/Edge performance
];

export function PathOverview({ onLoadData }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  return (
    <ContentWrap>
      <ContentContainer header>
        <ContentMaxWidth>
          <PageTitle level={1}>
            <FormattedMessage {...messages.welcome.heading} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
    </ContentWrap>
  );
}

PathOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  dataReady: PropTypes.bool,
};

// const mapStateToProps = createStructuredSelector({
//   countries: state => getCountriesFiltered(state),
//   auxIndicators: state => getAuxIndicatorsLatest(state),
//   scoresAllCountries: state => getScoresByCountry(state),
//   standard: state => getStandardSearch(state),
//   assessed: state => getAssessedSearch(state),
//   scale: state => getScaleSearch(state),
//   dataReady: state => getDependenciesReady(state, DEPENDENCIES),
// });
export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathOverview));
