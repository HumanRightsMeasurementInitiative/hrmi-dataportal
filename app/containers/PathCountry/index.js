/**
 *
 * Country
 *
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { Box, Layer, ResponsiveContext } from 'grommet';

import rootMessages from 'messages';

import CountryMetric from 'containers/CountryMetric';
import Close from 'containers/Close';
import CountryReport from 'components/CountryReport';
import CountryPeople from 'components/CountryPeople';
import CountryAbout from 'components/CountryAbout';
import HeaderLinks from 'components/HeaderLinks';
import TabContainer from 'containers/TabContainer';

import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getIndicatorsForCountry,
  getCountry,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRiskForCountry,
  getDimensionAverages,
  getAuxIndicatorsForCountry,
  getCountryCurrentGDP,
  getESRYear,
  getCPRYear,
  getDependenciesReady,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate, setTab } from 'containers/App/actions';

import { INCOME_GROUPS } from 'containers/App/constants';
import quasiEquals from 'utils/quasi-equals';
import { hasCPR } from 'utils/scores';
import { useInjectSaga } from 'utils/injectSaga';
import { isMinSize } from 'utils/responsive';
import saga from 'containers/App/saga';

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
  'auxIndicators',
  'atRisk',
];

export function PathCountry({
  intl,
  onLoadData,
  onCategoryClick,
  match,
  dimensions,
  rights,
  indicators,
  country,
  scale,
  benchmark,
  atRisk,
  onMetricClick,
  onCloseMetricOverlay,
  onAtRiskClick,
  standard,
  dimensionAverages,
  auxIndicators,
  currentGDP,
  esrYear,
  cprYear,
  dataReady,
}) {
  const layerRef = useRef();
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  useEffect(() => {
    // kick off loading of data
    if (match.params.metric) {
      disableBodyScroll(layerRef);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  });
  const countryCode = match.params.country;

  const incomeGroup =
    country &&
    INCOME_GROUPS.find(g => quasiEquals(g.value, country.high_income_country));

  const countryTitle =
    countryCode && intl.formatMessage(rootMessages.countries[countryCode]);

  return (
    <ContentWrap>
      <Helmet>
        <title>{countryTitle}</title>
        <meta name="description" content="Description of Country page" />
      </Helmet>
      {match.params.metric && (
        <ResponsiveContext.Consumer>
          {size => (
            <Layer
              ref={layerRef}
              full="vertical"
              margin={{
                top: isMinSize(size, 'xlarge') ? 'large' : 'small',
                bottom: 'ms',
              }}
              onEsc={() => {
                enableBodyScroll(layerRef);
                onCloseMetricOverlay(countryCode);
              }}
              onClickOutside={() => {
                enableBodyScroll(layerRef);
                onCloseMetricOverlay(countryCode);
              }}
            >
              <CountryMetric
                metricCode={match.params.metric}
                countryCode={countryCode}
                base="country"
              />
            </Layer>
          )}
        </ResponsiveContext.Consumer>
      )}
      <ContentContainer direction="column" header>
        <ContentMaxWidth>
          <Close float />
          <Box direction="column">
            {country && incomeGroup && (
              <HeaderLinks
                onItemClick={(key, value) => onCategoryClick(key, value)}
                items={[
                  {
                    key: 'all',
                    label: intl.formatMessage(rootMessages.labels.allCountries),
                  },
                  {
                    key: 'region',
                    value: country.region_code,
                    label: intl.formatMessage(
                      rootMessages.regions[country.region_code],
                    ),
                  },
                  {
                    key: 'oecd',
                    value: country.OECD_country,
                    label: intl.formatMessage(
                      rootMessages.oecd[country.OECD_country],
                    ),
                  },
                  {
                    key: 'income',
                    value: incomeGroup.key,
                    label: intl.formatMessage(
                      rootMessages.income[incomeGroup.key],
                    ),
                  },
                ]}
              />
            )}
            <PageTitle>{countryTitle}</PageTitle>
          </Box>
        </ContentMaxWidth>
      </ContentContainer>
      <ContentMaxWidth>
        <TabContainer
          tabs={[
            {
              key: 'report',
              title: intl.formatMessage(rootMessages.tabs.report),
              howToRead: {
                contxt: 'PathCountry',
                chart: 'Summary',
                data: scale,
              },
              content: props => (
                <CountryReport
                  {...props}
                  countryTitle={countryTitle}
                  dimensions={dimensions}
                  rights={rights}
                  indicators={indicators}
                  country={country}
                  scale={scale}
                  benchmark={benchmark}
                  atRiskData={atRisk}
                  standard={standard}
                  reference={dimensionAverages}
                  onAtRiskClick={() => onAtRiskClick()}
                  onMetricClick={(metric, tab) =>
                    onMetricClick(countryCode, metric, tab)
                  }
                  esrYear={esrYear}
                  cprYear={cprYear}
                  dataReady={dataReady}
                />
              ),
            },
            {
              key: 'atrisk',
              title: intl.formatMessage(rootMessages.tabs['people-at-risk']),
              // howToRead: {
              //   contxt: 'PathCountry',
              //   chart: 'WordCloud',
              //   data: 'atRisk',
              // },
              content: props =>
                hasCPR(dimensions) && (
                  <CountryPeople
                    {...props}
                    data={atRisk}
                    countryTitle={countryTitle}
                    countryCode={countryCode}
                  />
                ),
            },
            {
              key: 'about',
              title: intl.formatMessage(rootMessages.tabs.about),
              content: props => (
                <CountryAbout
                  {...props}
                  country={country}
                  auxIndicators={auxIndicators}
                  currentGDP={currentGDP}
                  onCategoryClick={onCategoryClick}
                  showFAQs={
                    props && (props.activeTab === 0 || props.activeTab === 2)
                  }
                />
              ),
            },
          ]}
        />
      </ContentMaxWidth>
    </ContentWrap>
  );
}

PathCountry.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
  activeTab: PropTypes.number,
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  onCloseMetricOverlay: PropTypes.func,
  match: PropTypes.object,
  atRisk: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensionAverages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  dataReady: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  country: (state, { match }) => getCountry(state, match.params.country),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  indicators: (state, { match }) =>
    getIndicatorsForCountry(state, match.params.country),
  rights: (state, { match }) =>
    getRightsForCountry(state, match.params.country),
  dimensions: (state, { match }) =>
    getDimensionsForCountry(state, match.params.country),
  atRisk: (state, { match }) => getPeopleAtRiskForCountry(state, match.params),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  esrYear: state => getESRYear(state),
  cprYear: state => getCPRYear(state),
  dimensionAverages: state => getDimensionAverages(state),
  currentGDP: (state, { match }) =>
    getCountryCurrentGDP(state, match.params.country),
  auxIndicators: (state, { match }) =>
    getAuxIndicatorsForCountry(state, match.params.country),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onCategoryClick: (key, value) => {
      const deleteParams = ['income', 'region', 'assessed'];
      dispatch(
        navigate(
          { pathname: '', search: key === 'all' ? '' : `?${key}=${value}` },
          {
            replace: false,
            deleteParams: deleteParams.filter(p => p !== key),
          },
        ),
      );
    },
    onClose: () => dispatch(navigate('')),
    onMetricClick: (country, metric, tab = 0) =>
      dispatch(
        navigate(
          {
            pathname: `/country/${country}/${metric}`,
            search: `?mtab=${tab}`,
          },
          {
            replace: false,
          },
        ),
      ),
    onAtRiskClick: () => {
      window.scrollTo(0, 0);
      return dispatch(setTab(1));
    },
    onCloseMetricOverlay: country =>
      dispatch(
        navigate(
          {
            pathname: `/country/${country}`,
          },
          {
            replace: false,
            deleteParams: ['mtab'],
          },
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathCountry));
