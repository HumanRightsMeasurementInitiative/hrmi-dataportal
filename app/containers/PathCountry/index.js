/**
 *
 * Country
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { Box, ResponsiveContext, Image as GImage, Paragraph } from 'grommet';
import { withTheme } from 'styled-components';

import rootMessages from 'messages';

import {
  getDimensionsForCountry,
  getRightsForCountry,
  getIndicatorsForCountry,
  getCountry,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRiskForCountry,
  getDependenciesReady,
  getESRIndicators,
  getCountryGrammar,
} from 'containers/App/selectors';

import {
  loadDataIfNeeded,
  navigate,
  trackEvent,
  openHowToRead,
  openSettings,
} from 'containers/App/actions';
import {
  // INCOME_GROUPS,
  COUNTRY_FILTERS,
  PATHS,
  FAQS,
  IMAGE_PATH,
  BENCHMARKS,
  COLUMNS,
} from 'containers/App/constants';
import saga from 'containers/App/saga';
import TabContainer from 'containers/TabContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import LayerInfo from 'containers/LayerInfo';

import TabCountryReport from 'components/TabCountryReport';
import TabCountrySnapshot from 'components/TabCountrySnapshot';
import TabCountryPeople from 'components/TabCountryPeople';
import Breadcrumb from 'components/Breadcrumb';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';

import getMetricDetails from 'utils/metric-details';
// import quasiEquals from 'utils/quasi-equals';
import { hasCPR, formatScore } from 'utils/scores';
import { useInjectSaga } from 'utils/injectSaga';
import { isMinSize } from 'utils/responsive';
import { getMessageGrammar } from 'utils/narrative';
//
// const Image = styled.img`
//   width: 100%;
// `;

import messages from './messages';

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

const getMetricScore = (metric, dimensions, rights, indicators, benchmark) => {
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  let currentMetric;
  if (metric.metricType === 'dimensions' && dimensions) {
    currentMetric = dimensions[metric.key];
  }
  if (metric.metricType === 'rights' && rights) {
    currentMetric = rights[metric.key];
  }
  if (metric.metricType === 'indicators') {
    currentMetric = indicators[metric.key];
  }
  if (currentMetric) {
    if (metric.type === 'esr') {
      return currentMetric.score[currentBenchmark.column];
    }
    return currentMetric.score[COLUMNS.CPR.MEAN];
  }
  return null;
};

export function PathCountry({
  intl,
  onLoadData,
  onCategoryClick,
  match,
  dimensions,
  rights,
  indicators,
  country,
  atRisk,
  standard,
  dataReady,
  allIndicators,
  countryGrammar,
  closeLayers,
  benchmark,
}) {
  const [aboutMetric, setAboutMetric] = useState(null);

  // const layerRef = useRef();
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const countryCode = match.params.country;

  // const incomeGroup =
  //   country &&
  //   INCOME_GROUPS.values.find(g =>
  //     quasiEquals(g.value, country.high_income_country),
  //   );
  if (!rootMessages.countries[countryCode]) {
    console.log('Country code not in language files:', countryCode);
  }
  const countryTitle =
    countryCode && rootMessages.countries[countryCode]
      ? intl.formatMessage(rootMessages.countries[countryCode])
      : countryCode;
  const aboutMetricDetails = aboutMetric && getMetricDetails(aboutMetric);
  // prettier-ignore
  const messageValues = {
    ...getMessageGrammar(
      intl,
      countryCode,
      country.region_code,
      countryGrammar,
    ),
  };
  let countryScoreMsg;
  if (aboutMetric) {
    const score = getMetricScore(
      aboutMetricDetails,
      dimensions,
      rights,
      indicators,
      benchmark,
    );
    if (aboutMetricDetails.type === 'esr') {
      // prettier-ignore
      countryScoreMsg = score
        ? (<FormattedMessage
          {...messages.countryScoreExplainer.esr[benchmark]}
          values={{
            ...messageValues,
            score: formatScore(score),
            metric: intl.formatMessage(rootMessages[aboutMetricDetails.metricType][aboutMetric]),
          }}
        />)
        : (<FormattedMessage
          {...messages.countryScoreExplainer.noDate}
          values={messageValues}
        />);
    }
    if (aboutMetricDetails.type === 'cpr') {
      // prettier-ignore
      countryScoreMsg = score
        ? (<FormattedMessage
          {...messages.countryScoreExplainer.cpr}
          values={{
            ...messageValues,
            score: formatScore(score),
            metric: intl.formatMessage(rootMessages[aboutMetricDetails.metricType][aboutMetric]),
            link: (
              <a
                href={intl.formatMessage(messages.countryScoreExplainer.cprLink.url)}
                target="_blank"
              >
                {intl.formatMessage(messages.countryScoreExplainer.cprLink.anchor)}
              </a>
            ),
          }}
        />)
        : (<FormattedMessage
          {...messages.countryScoreExplainer.noDate}
          values={messageValues}
        />);
    }
  }
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{countryTitle}</title>
            <meta name="description" content="Description of Country page" />
          </Helmet>
          {aboutMetric && (
            <LayerInfo
              content={
                <AboutMetricContainer
                  metricCode={aboutMetric}
                  metric={aboutMetricDetails}
                  showTitle
                  showMetricLink
                  showSources
                  countryScoreMsg={countryScoreMsg}
                />
              }
              onClose={() => setAboutMetric(null)}
            />
          )}
          <Box style={{ position: 'relative' }} height="280px">
            {isMinSize(size, 'large') && <AsideBackground />}
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                height="280px"
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn hasAside={isMinSize(size, 'large')} header hasLinks>
                  <Breadcrumb
                    onItemClick={(key, value) => onCategoryClick(key, value)}
                    breadcrumb
                    items={[
                      {
                        key: 'all',
                        label: intl.formatMessage(
                          rootMessages.labels.allCountries,
                        ),
                      },
                    ]}
                  />
                  <PageTitle>{countryTitle}</PageTitle>
                  <Paragraph>
                    <FormattedMessage
                      {...messages.header.a}
                      values={messageValues}
                    />
                  </Paragraph>
                  <Paragraph>
                    <FormattedMessage
                      {...messages.header.b}
                      values={messageValues}
                    />
                  </Paragraph>
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <GImage
                      src={`${IMAGE_PATH}/${countryCode}.jpg`}
                      fit="cover"
                    />
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </Box>
          <TabContainer
            size={size}
            tabs={[
              {
                key: 'snapshot',
                title: intl.formatMessage(rootMessages.tabs.snapshot),
                content: props => (
                  <TabCountrySnapshot
                    {...props}
                    countryCode={countryCode}
                    onMetricClick={code => {
                      closeLayers();
                      setAboutMetric(aboutMetric ? null : code);
                    }}
                    messageValues={messageValues}
                  />
                ),
                tools: {
                  howToReadConfig: {
                    key: 'tab-snapshot',
                    charts: ['Bar'],
                  },
                  settingsConfig: {
                    key: 'tab-snapshot',
                    showStandard: true,
                    showBenchmark: true,
                  },
                },
              },
              {
                key: 'report-esr',
                title: intl.formatMessage(rootMessages.tabs.esr),
                content: props => (
                  <TabCountryReport
                    {...props}
                    type="esr"
                    dimension="esr"
                    countryTitle={countryTitle}
                    hasDimensionScore={dataReady && !!dimensions.esr.score}
                    indicators={indicators}
                    country={country}
                    standard={standard}
                    dataReady={dataReady}
                    allIndicators={allIndicators}
                    onMetricClick={code => {
                      closeLayers();
                      setAboutMetric(aboutMetric ? null : code);
                    }}
                    messageValues={messageValues}
                  />
                ),
                tools: {
                  howToReadConfig: {
                    key: 'country-dimension-esr',
                    charts: ['Bar'],
                  },
                  settingsConfig: {
                    key: 'country-dimension-esr',
                    showStandard: true,
                    showBenchmark: true,
                  },
                },
              },
              {
                key: 'report-physint',
                title: intl.formatMessage(rootMessages.tabs.physint),
                content: props => (
                  <TabCountryReport
                    {...props}
                    type="cpr"
                    dimension="physint"
                    countryTitle={countryTitle}
                    hasDimensionScore={dataReady && hasCPR(dimensions)}
                    country={country}
                    dataReady={dataReady}
                    onMetricClick={code => {
                      closeLayers();
                      setAboutMetric(aboutMetric ? null : code);
                    }}
                    messageValues={messageValues}
                  />
                ),
                tools: {
                  howToReadConfig: {
                    key: 'country-dimension-physint',
                    charts: ['Bullet'],
                    dimension: 'physint',
                  },
                },
              },
              {
                key: 'report-empowerment',
                title: intl.formatMessage(rootMessages.tabs.empowerment),
                content: props => (
                  <TabCountryReport
                    {...props}
                    type="cpr"
                    dimension="empowerment"
                    countryTitle={countryTitle}
                    hasDimensionScore={dataReady && hasCPR(dimensions)}
                    country={country}
                    dataReady={dataReady}
                    onMetricClick={code => {
                      closeLayers();
                      setAboutMetric(aboutMetric ? null : code);
                    }}
                    messageValues={messageValues}
                  />
                ),
                tools: {
                  howToReadConfig: {
                    key: 'country-dimension-empowerment',
                    charts: ['Bullet'],
                    dimension: 'empowerment',
                  },
                },
              },
              {
                key: 'atrisk',
                title: intl.formatMessage(rootMessages.tabs['people-at-risk']),
                // howToRead: {
                //   chart: 'ChartWordCloud',
                //   data: 'atRisk',
                // },
                content: props =>
                  hasCPR(dimensions) && (
                    <TabCountryPeople
                      {...props}
                      data={atRisk}
                      countryTitle={countryTitle}
                      countryCode={countryCode}
                      messageValues={messageValues}
                    />
                  ),
              },
              {
                aside: true,
                key: 'about',
                title: intl.formatMessage(rootMessages.tabs.about),
                content: props => {
                  let faqs = [];
                  if (
                    props &&
                    (props.active === 0 || props.active === 'snapshot')
                  ) {
                    faqs = FAQS.COUNTRY_SNAPSHOT;
                  }
                  if (
                    props &&
                    (props.active === 1 || props.active === 'report-esr')
                  ) {
                    faqs = FAQS.COUNTRY_ESR;
                  }
                  if (
                    props &&
                    (props.active === 2 || props.active === 'report-cpr')
                  ) {
                    faqs = FAQS.COUNTRY_CPR;
                  }
                  // TODO check about tab
                  return (
                    <AboutCountryContainer
                      {...props}
                      countryCode={countryCode}
                      onCategoryClick={onCategoryClick}
                      showFAQs={faqs}
                      messageValues={messageValues}
                    />
                  );
                },
              },
            ]}
          />
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathCountry.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  dataReady: PropTypes.bool,
  onRawChange: PropTypes.func,
  raw: PropTypes.bool,
  theme: PropTypes.object,
  closeLayers: PropTypes.func,
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
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  allIndicators: state => getESRIndicators(state),
  countryGrammar: (state, { match }) =>
    getCountryGrammar(state, match.params.country),
});

export function mapDispatchToProps(dispatch) {
  return {
    closeLayers: () => {
      dispatch(openHowToRead(null));
      dispatch(openSettings(null));
    },
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onCategoryClick: (key, value) => {
      const deleteParams = COUNTRY_FILTERS;
      dispatch(
        navigate(
          {
            pathname: `/${PATHS.COUNTRIES}`,
            search: key === 'all' ? '' : `?${key}=${value}`,
          },
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
    onTrackEvent: e => dispatch(trackEvent(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathCountry)));
