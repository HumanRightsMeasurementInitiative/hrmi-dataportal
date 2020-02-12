/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';

import { Box } from 'grommet';

import rootMessages from 'messages';

import Close from 'containers/Close';
import CountryReportESR from 'components/CountryReportESR';
import CountryReportCPR from 'components/CountryReportCPR';
import CountrySnapshot from 'components/CountrySnapshot';
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
  getCountryGrammar,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRiskForCountry,
  getDimensionAverages,
  getAuxIndicatorsForCountry,
  getLatestCountryCurrentGDP,
  getLatestCountry2011PPPGDP,
  getESRYear,
  getCPRYear,
  getDependenciesReady,
} from 'containers/App/selectors';

import {
  loadDataIfNeeded,
  navigate,
  setTab,
  trackEvent,
} from 'containers/App/actions';

import { INCOME_GROUPS, COUNTRY_FILTERS } from 'containers/App/constants';
import quasiEquals from 'utils/quasi-equals';
import { hasCPR } from 'utils/scores';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
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
  countryGrammar,
  scale,
  benchmark,
  atRisk,
  onAtRiskClick,
  standard,
  dimensionAverages,
  auxIndicators,
  currentGDP,
  pppGDP,
  esrYear,
  cprYear,
  dataReady,
  onTrackEvent,
}) {
  // const layerRef = useRef();
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const countryCode = match.params.country;

  const incomeGroup =
    country &&
    INCOME_GROUPS.values.find(g =>
      quasiEquals(g.value, country.high_income_country),
    );
  if (!rootMessages.countries[countryCode]) {
    console.log('Country code not in language files:', countryCode);
  }
  const countryTitle =
    countryCode && rootMessages.countries[countryCode]
      ? intl.formatMessage(rootMessages.countries[countryCode])
      : countryCode;

  return (
    <ContentWrap>
      <Helmet>
        <title>{countryTitle}</title>
        <meta name="description" content="Description of Country page" />
      </Helmet>
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
              key: 'snapshot',
              title: intl.formatMessage(rootMessages.tabs.snapshot),
              howToRead: {
                contxt: 'PathCountry',
                chart: 'Summary',
                data: scale,
              },
              content: props => (
                <CountrySnapshot
                  {...props}
                  countryTitle={countryTitle}
                  dimensions={dimensions}
                  rights={rights}
                  country={country}
                  countryGrammar={countryGrammar}
                  scale={scale}
                  benchmark={benchmark}
                  atRiskData={atRisk}
                  standard={standard}
                  reference={dimensionAverages}
                  esrYear={esrYear}
                  cprYear={cprYear}
                  dataReady={dataReady}
                />
              ),
            },
            {
              key: 'report-esr',
              title: intl.formatMessage(rootMessages.tabs.reportESR),
              howToRead: {
                contxt: 'PathCountry',
                chart: 'Summary',
                data: scale,
              },
              content: props => (
                <CountryReportESR
                  {...props}
                  countryTitle={countryTitle}
                  dimensions={dimensions}
                  rights={rights}
                  indicators={indicators}
                  country={country}
                  countryGrammar={countryGrammar}
                  scale={scale}
                  benchmark={benchmark}
                  atRiskData={atRisk}
                  standard={standard}
                  reference={dimensionAverages}
                  onAtRiskClick={() => onAtRiskClick()}
                  onMetricClick={(metric, tab) =>
                    console.log('metric click', countryCode, metric, tab)
                  }
                  esrYear={esrYear}
                  cprYear={cprYear}
                  dataReady={dataReady}
                  trackEvent={onTrackEvent}
                />
              ),
            },
            {
              key: 'report-cpr',
              title: intl.formatMessage(rootMessages.tabs.reportCPR),
              howToRead: {
                contxt: 'PathCountry',
                chart: 'Summary',
                data: scale,
              },
              content: props => (
                <CountryReportCPR
                  {...props}
                  countryTitle={countryTitle}
                  dimensions={dimensions}
                  rights={rights}
                  country={country}
                  countryGrammar={countryGrammar}
                  scale={scale}
                  benchmark={benchmark}
                  atRiskData={atRisk}
                  standard={standard}
                  reference={dimensionAverages}
                  onAtRiskClick={() => onAtRiskClick()}
                  onMetricClick={(metric, tab) =>
                    console.log('metric click', countryCode, metric, tab)
                  }
                  cprYear={cprYear}
                  dataReady={dataReady}
                  trackEvent={onTrackEvent}
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
                  pppGDP={pppGDP}
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
  onTrackEvent: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
  activeTab: PropTypes.number,
  onAtRiskClick: PropTypes.func,
  match: PropTypes.object,
  atRisk: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensionAverages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  dataReady: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  country: (state, { match }) => getCountry(state, match.params.country),
  countryGrammar: (state, { match }) =>
    getCountryGrammar(state, match.params.country),
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
    getLatestCountryCurrentGDP(state, match.params.country),
  pppGDP: (state, { match }) =>
    getLatestCountry2011PPPGDP(state, match.params.country),
  auxIndicators: (state, { match }) =>
    getAuxIndicatorsForCountry(state, match.params.country),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onCategoryClick: (key, value) => {
      const deleteParams = COUNTRY_FILTERS;
      dispatch(
        navigate(
          { pathname: '', search: key === 'all' ? '' : `?${key}=${value}` },
          {
            replace: false,
            deleteParams: deleteParams.filter(p => p !== key),
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Country, tags)',
              value: `${key}/${value}`,
            },
          },
        ),
      );
    },
    onClose: () => dispatch(navigate('')),
    onAtRiskClick: () => {
      window.scrollTo(0, 0);
      return dispatch(setTab(1));
    },
    onTrackEvent: e => dispatch(trackEvent(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathCountry));
