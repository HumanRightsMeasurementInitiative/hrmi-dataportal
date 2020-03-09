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
  getPeopleAtRiskForCountry,
  getDependenciesReady,
  getESRIndicators,
  getCountryGrammar,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate, trackEvent } from 'containers/App/actions';

import {
  // INCOME_GROUPS,
  COUNTRY_FILTERS,
  PATHS,
  FAQS,
  IMAGE_PATH,
} from 'containers/App/constants';
import saga from 'containers/App/saga';
import TabContainer from 'containers/TabContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import LayerInfo from 'containers/LayerInfo';

import TabCountryReport from 'components/TabCountryReport';
import TabCountrySnapshot from 'components/TabCountrySnapshot';
import TabCountryPeople from 'components/TabCountryPeople';
import HeaderLinks from 'components/HeaderLinks';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';

import getMetricDetails from 'utils/metric-details';
// import quasiEquals from 'utils/quasi-equals';
import { hasCPR } from 'utils/scores';
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

export function PathCountry({
  intl,
  onLoadData,
  onCategoryClick,
  match,
  dimensions,
  indicators,
  country,
  atRisk,
  standard,
  dataReady,
  allIndicators,
  countryGrammar,
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
  // prettier-ignore
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
                  metric={getMetricDetails(aboutMetric)}
                  showTitle
                  showMetricLink
                  showSources
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
                <MainColumn hasAside={isMinSize(size, 'large')} header>
                  <HeaderLinks
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
                      {...messages.header}
                      values={getMessageGrammar(
                        intl,
                        countryCode,
                        null,
                        countryGrammar,
                      )}
                    />
                  </Paragraph>
                  <Paragraph>
                    <FormattedMessage
                      {...messages.header2}
                      values={getMessageGrammar(
                        intl,
                        countryCode,
                        null,
                        countryGrammar,
                      )}
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
                    onMetricClick={code => setAboutMetric(code)}
                  />
                ),
              },
              {
                key: 'report-esr',
                title: intl.formatMessage(rootMessages.dimensions.esr),
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
                    onMetricClick={code => setAboutMetric(code)}
                  />
                ),
              },
              {
                key: 'report-physint',
                title: intl.formatMessage(rootMessages.dimensions.physint),
                content: props => (
                  <TabCountryReport
                    {...props}
                    type="cpr"
                    dimension="physint"
                    countryTitle={countryTitle}
                    hasDimensionScore={dataReady && hasCPR(dimensions)}
                    country={country}
                    dataReady={dataReady}
                    onMetricClick={code => setAboutMetric(code)}
                  />
                ),
              },
              {
                key: 'report-empowerment',
                title: intl.formatMessage(rootMessages.dimensions.empowerment),
                content: props => (
                  <TabCountryReport
                    {...props}
                    type="cpr"
                    dimension="empowerment"
                    countryTitle={countryTitle}
                    hasDimensionScore={dataReady && hasCPR(dimensions)}
                    country={country}
                    dataReady={dataReady}
                    onMetricClick={code => setAboutMetric(code)}
                  />
                ),
              },
              {
                key: 'atrisk',
                title: intl.formatMessage(rootMessages.tabs['people-at-risk']),
                // howToRead: {
                //   contxt: 'PathCountry',
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
                    (props.active === 1 || props.active === 'esr-report')
                  ) {
                    faqs = FAQS.COUNTRY_ESR;
                  }
                  if (
                    props &&
                    (props.active === 2 || props.active === 'cpr-report')
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
  allIndicators: state => getESRIndicators(state),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
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
