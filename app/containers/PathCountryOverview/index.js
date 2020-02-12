/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { STANDARDS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getScaleSearch,
  getDependenciesReady,
  getAuxIndicatorsLatest,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import OverviewCountries from 'containers/OverviewCountries';
import TabContainer from 'containers/TabContainer';
import rootMessages from 'messages';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';

import { filterByAssessment } from 'utils/scores';
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

export function PathCountryOverview({
  countries,
  scoresAllCountries,
  intl,
  standard,
  assessed,
  scale,
  onLoadData,
  dataReady,
  auxIndicators,
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
          <PageTitle level={1}>
            <FormattedMessage {...messages.aboveTitle} />
          </PageTitle>
        </ContentMaxWidth>
      </ContentContainer>
      <ContentMaxWidth>
        <TabContainer
          tabs={[
            {
              key: 'countries',
              title: intl.formatMessage(rootMessages.tabs.countries, {
                count: filteredCountries ? `${filteredCountries.length} ` : '',
              }),
              titleMobile: intl.formatMessage(
                rootMessages.tabs.mobile.countries,
              ),
              content: props => (
                <OverviewCountries
                  countries={filteredCountries}
                  scoresAllCountries={scoresAllCountries}
                  auxIndicators={auxIndicators}
                  dataReady={dataReady}
                  {...props}
                />
              ),
              howToRead: {
                contxt: 'PathCountryOverview',
                chart: 'Diamonds',
                data: scale,
              },
            },
          ]}
        />
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathCountryOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  dataReady: PropTypes.bool,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  auxIndicators: state => getAuxIndicatorsLatest(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
  scale: state => getScaleSearch(state),
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

export default compose(withConnect)(injectIntl(PathCountryOverview));
