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
import { Layer, ResponsiveContext } from 'grommet';

import { STANDARDS } from 'containers/App/constants';

import {
  getCountriesFiltered,
  getScoresByCountry,
  getStandardSearch,
  getAssessedSearch,
  getScaleSearch,
  getDependenciesReady,
  getHighlightCountry,
  getShowWelcome,
  getAuxIndicatorsLatest,
} from 'containers/App/selectors';
import { loadDataIfNeeded, showWelcome } from 'containers/App/actions';

import OverviewMetrics from 'containers/OverviewMetrics';
import OverviewCountries from 'containers/OverviewCountries';
import TabContainer from 'containers/TabContainer';
import rootMessages from 'messages';

// styles
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';

import { filterByAssessment } from 'utils/filters';
import { useInjectSaga } from 'utils/injectSaga';
import { isMinSize } from 'utils/responsive';
import saga from 'containers/App/saga';

import WelcomePanel from './WelcomePanel';
import messages from './messages';

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'auxIndicators',
  // 'esrIndicatorScores', // consider removing to improve IE11/Edge performance
];

export function PathOverview({
  countries,
  scoresAllCountries,
  intl,
  standard,
  assessed,
  scale,
  onLoadData,
  dataReady,
  activeCountry,
  showWelcomePanel,
  dismissWelcome,
  auxIndicators,
}) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const standardDetails = STANDARDS.find(s => s.key === standard);
  // prettier-ignore
  const filteredCountries = assessed && assessed.length > 0
    ? countries && countries.filter(c =>
      filterByAssessment(c, scoresAllCountries, assessed[0], standardDetails),
    )
    : countries;

  return (
    <ContentWrap>
      {showWelcomePanel && (
        <ResponsiveContext.Consumer>
          {size => (
            <Layer
              animate={false}
              onEsc={dismissWelcome}
              onClickOutside={dismissWelcome}
              responsive={false}
              full={isMinSize(size, 'medium') ? false : 'horizontal'}
            >
              <WelcomePanel dismiss={dismissWelcome} />
            </Layer>
          )}
        </ResponsiveContext.Consumer>
      )}
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
                contxt: 'PathOverview',
                chart: 'Diamonds',
                data: scale,
              },
            },
            {
              key: 'metrics',
              title: intl.formatMessage(rootMessages.tabs.metrics),
              titleMobile: intl.formatMessage(rootMessages.tabs.mobile.metrics),
              content: props => (
                <OverviewMetrics
                  countries={filteredCountries}
                  scoresAllCountries={scoresAllCountries}
                  dataReady={dataReady}
                  activeCountry={activeCountry}
                  {...props}
                />
              ),
            },
          ]}
        />
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathOverview.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  dismissWelcome: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  dataReady: PropTypes.bool,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessed: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  activeCountry: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showWelcomePanel: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  countries: state => getCountriesFiltered(state),
  auxIndicators: state => getAuxIndicatorsLatest(state),
  scoresAllCountries: state => getScoresByCountry(state),
  standard: state => getStandardSearch(state),
  assessed: state => getAssessedSearch(state),
  scale: state => getScaleSearch(state),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  activeCountry: state => getHighlightCountry(state),
  showWelcomePanel: state => getShowWelcome(state),
});
export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    dismissWelcome: () => dispatch(showWelcome(false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathOverview));
