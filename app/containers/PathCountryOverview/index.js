/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box } from 'grommet';

import { STANDARDS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getDependenciesReady,
  getAuxIndicatorsLatest,
  getFeaturedValues,
  getFeatured,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import OverviewCountries from 'containers/OverviewCountries';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ColumnContent from 'styled/ColumnContent';
import PageTitle from 'styled/PageTitle';

import { filterByAssessment } from 'utils/filters';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import messages from './messages';

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'auxIndicators',
  'featured',
  // 'esrIndicatorScores', // consider removing to improve IE11/Edge performance
];

export function PathCountryOverview({
  countries,
  scoresAllCountries,
  standard,
  assessed,
  onLoadData,
  dataReady,
  auxIndicators,
  featuredValues,
  featuredCountries,
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  // prettier-ignore
  const filteredCountries = assessed
    ? countries && countries.filter(c =>
      filterByAssessment(
        c,
        scoresAllCountries,
        assessed,
        STANDARDS.find(s => s.key === standard),
      ),
    )
    : countries;

  return (
    <ContentWrap>
      <ContentContainer header background="light-1">
        <ContentMaxWidth>
          <PageTitle level={2}>
            <FormattedMessage {...messages.title} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
      <ContentMaxWidth>
        <Box direction="row" margin="0 auto" width="100%">
          <Box direction="column" flex style={{ position: 'relative' }}>
            <ColumnContent>
              <OverviewCountries
                countries={filteredCountries}
                scoresAllCountries={scoresAllCountries}
                auxIndicators={auxIndicators}
                dataReady={dataReady}
                featuredValues={featuredValues}
                featuredCountries={featuredCountries}
              />
            </ColumnContent>
          </Box>
        </Box>
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathCountryOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dataReady: PropTypes.bool,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  auxIndicators: state => getAuxIndicatorsLatest(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  featuredValues: state => getFeaturedValues(state),
  featuredCountries: state => getFeatured(state),
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

export default compose(withConnect)(PathCountryOverview);
