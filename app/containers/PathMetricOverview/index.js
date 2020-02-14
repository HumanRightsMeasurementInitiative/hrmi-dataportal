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
  getCountries,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getDependenciesReady,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';
import Close from 'containers/Close';
import OverviewMetrics from 'containers/OverviewMetrics';
import rootMessages from 'messages';

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
  // 'esrIndicatorScores', // consider removing to improve IE11/Edge performance
];

export function PathMetricOverview({
  countries,
  scoresAllCountries,
  standard,
  assessed,
  onLoadData,
  dataReady,
  activeCountry,
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const standardDetails = STANDARDS.find(s => s.key === standard);
  // prettier-ignore
  const filteredCountries = assessed
    ? countries && countries.filter(c =>
      filterByAssessment(c, scoresAllCountries, assessed, standardDetails),
    )
    : countries;

  return (
    <ContentWrap>
      <ContentContainer header>
        <ContentMaxWidth>
          <Close />
          <PageTitle level={2}>
            <FormattedMessage {...messages.title} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
      <ContentMaxWidth maxWidth="786px">
        <Box direction="row" margin="0 auto" width="100%">
          <Box direction="column" flex style={{ position: 'relative' }}>
            <div>
              <FormattedMessage {...rootMessages.tabs.metrics} />
            </div>
            <ColumnContent>
              <OverviewMetrics
                countries={filteredCountries}
                scoresAllCountries={scoresAllCountries}
                dataReady={dataReady}
                activeCountry={activeCountry}
              />
            </ColumnContent>
          </Box>
        </Box>
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathMetricOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dataReady: PropTypes.bool,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  activeCountry: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountries(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
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

export default compose(withConnect)(PathMetricOverview);
