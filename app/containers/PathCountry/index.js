/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { ResponsiveContext, Image as GImage } from 'grommet';
import styled, { withTheme } from 'styled-components';

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
  getAsideLayer,
  getAsideLayerActiveCode,
  getAtRiskSearch,
  getContent,
  getLatestPacificScoresForCountry,
} from 'containers/App/selectors';

import {
  loadDataIfNeeded,
  navigate,
  trackEvent,
  setAsideLayer,
  setHighlightGroup,
  loadContentIfNeeded,
  selectCountry,
} from 'containers/App/actions';
import {
  // INCOME_GROUPS,
  COUNTRY_FILTERS,
  PATHS,
  FAQS,
  IMAGE_PATH,
  BENCHMARKS,
  COLUMNS,
  RIGHTS,
} from 'containers/App/constants';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import TabContainer from 'containers/TabContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

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
import ButtonText from 'styled/ButtonText';

import getMetricDetails from 'utils/metric-details';
// import quasiEquals from 'utils/quasi-equals';
import { hasCPR, formatScore } from 'utils/scores';

import { isMinSize } from 'utils/responsive';
import { getMessageGrammar } from 'utils/narrative';
import { lowerCase } from 'utils/string';

import messages from './messages';
import TabCountryPacific from '../../components/TabCountryPacific';

const RemoveFromPDFWrapper = styled.div`
  @media print {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  @media print {
    display: flex;
    align-items: flex-end;
    height: 140px;
    width: 100%;
    background-image: ${({ pdfImageSrc }) => `url(${pdfImageSrc})`};
    background-size: cover;
    background-position: center;
  }
`;

const StyledPageTitle = styled(PageTitle)`
  @media print {
    font-size: 40px;
    line-height: 43px;
  }
`;

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
  'auxIndicators',
  'atRisk',
  'pacific',
];

const getSubrights = metric => RIGHTS.filter(r => r.aggregate === metric.key);

const hasSubrights = metric => {
  const subrights = getSubrights(metric);
  return subrights.length > 0;
};

const hasAnalysis = metric =>
  metric.metricType === 'rights' ||
  (metric.metricType === 'dimensions' && metric.key === 'esr');

const generateKey = (metricCode, countryCode) => {
  const metric = getMetricDetails(metricCode);
  if (hasAnalysis(metric)) {
    if (metric.metricType === 'rights') {
      if (hasSubrights(metric)) {
        return getSubrights(metric).map(sr => `${sr.key}/${countryCode}`);
      }
      return `${metricCode}/${countryCode}`;
    }
    if (metric.metricType === 'dimensions' && metric.key === 'esr') {
      return `esr/${countryCode}`;
    }
  }
  return null;
};

const getMetricScore = (
  metric,
  dimensions,
  rights,
  indicators,
  benchmark,
  isSubright,
) => {
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
  if (currentMetric && currentMetric.score) {
    if (isSubright === false) {
      return currentMetric.score.value;
    }
    if (metric.type === 'esr') {
      return currentMetric.score[currentBenchmark.column];
    }
    return currentMetric.score[COLUMNS.CPR.MEAN];
  }
  return null;
};

const getScoreMsg = (
  code,
  benchmark,
  dimensions,
  rights,
  indicators,
  intl,
  messageValues,
  isSubright,
) => {
  let countryScoreMsg;
  const aboutMetricDetails = getMetricDetails(code);
  const score = getMetricScore(
    aboutMetricDetails,
    dimensions,
    rights,
    indicators,
    benchmark,
    isSubright,
  );
  /* eslint-disable no-nested-ternary */
  // prettier-ignore
  const metric =
    typeof isSubright === 'undefined'
      ? lowerCase(
        intl.formatMessage(rootMessages[aboutMetricDetails.metricType][code]),
      )
      : isSubright
        ? lowerCase(intl.formatMessage(rootMessages.subrights[code]))
        : lowerCase(intl.formatMessage(rootMessages['indicators-raw'][code]));

  if (aboutMetricDetails.type === 'esr') {
    // prettier-ignore
    countryScoreMsg = score && isSubright
      ? intl.formatMessage(
        messages.countryScoreExplainer.esr[`${benchmark}-subrights`],
        ({
          ...messageValues,
          score: formatScore(score, 1, intl),
          metric,
        }),
      )
      : score && isSubright === false
        ? intl.formatMessage(
          messages.indicatorScoreExplainer[aboutMetricDetails.key],
          ({
            ...messageValues,
            score: formatScore(score, 1, intl),
            metric,
          }),
        )
        : score 
          ? intl.formatMessage(
            messages.countryScoreExplainer.esr[benchmark],
            ({
              ...messageValues,
              score: formatScore(score, 1, intl),
              metric,
            }),
          )
          : intl.formatMessage(
            messages.countryScoreExplainer.noData,
            messageValues,
          );
    /* eslint-enable */
  }
  if (aboutMetricDetails.type === 'cpr') {
    // prettier-ignore
    countryScoreMsg = score
      ? <FormattedMessage
        {...messages.countryScoreExplainer.cpr}
        values={{
          ...messageValues,
          score: formatScore(score, 1, intl),
          metric,
          link: (
            <ButtonText
              as="a"
              href={intl.formatMessage(messages.countryScoreExplainer.cprLink.url)}
              target="_blank"
              inverse
            >
              {intl.formatMessage(messages.countryScoreExplainer.cprLink.anchor)}
            </ButtonText>
          ),
        }}
      />
      : intl.formatMessage(
        messages.countryScoreExplainer.noData,
        messageValues,
      );
  }
  return countryScoreMsg;
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
  benchmark,
  theme,
  onSetAsideLayer,
  asideLayer,
  activeCode,
  highlightGroup,
  onSetHighlightGroup,
  content,
  onLoadContent,
  onSelectCountry,
  pacificScores,
}) {
  // const [activeCode, setActiveCode] = useState();
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const countryCode = match.params.country;
  const keys = RIGHTS.map(r => generateKey(r.key, countryCode));

  // loads content for all rights for people at risk tab
  // re-runs when country code changes
  useEffect(() => {
    // keys.forEach(k => onLoadContent(k));
    onLoadContent(`atrisk/${countryCode}`);
    onLoadContent(`pacific/${countryCode}`);
    onLoadData();
  }, [match.params.country]);

  /* eslint-disable no-console */
  if (!rootMessages.countries[countryCode]) {
    console.log('Country code not in language files:', countryCode);
  }
  /* eslint-enable no-console */
  const countryTitle =
    countryCode && rootMessages.countries[countryCode]
      ? intl.formatMessage(rootMessages.countries[countryCode])
      : countryCode;

  // prettier-ignore
  const messageValues = {
    ...getMessageGrammar(
      intl,
      countryCode,
      country.region_code,
      countryGrammar,
    ),
  };

  const onMetricClick = (
    code,
    dimension,
    dateRange,
    isSubright,
    hasMultipleIndicators,
  ) => {
    if (asideLayer && asideLayer.key === code) {
      onSetAsideLayer(false);
    } else {
      onSetAsideLayer({
        type: 'aboutMetric',
        background: `${dimension || code}Active`,
        showSources:
          typeof isSubright === 'undefined' &&
          (dimension === 'esr' || code === 'esr'),
        key: code,
        code,
        countryCode,
        dateRange,
        countryScoreMsg: getScoreMsg(
          code,
          benchmark,
          dimensions,
          rights,
          indicators,
          intl,
          messageValues,
          isSubright,
        ),
        isSubright,
        hasMultipleIndicators,
      });
    }
  };

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{countryTitle}</title>
            <meta name="description" content="Description of Country page" />
          </Helmet>
          <div style={{ position: 'relative' }}>
            {isMinSize(size, 'large') && <AsideBackground />}
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                height={
                  isMinSize(size, 'large')
                    ? `${theme.sizes.top.height}px`
                    : 'auto'
                }
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn hasAside={isMinSize(size, 'large')} header hasLinks>
                  <RemoveFromPDFWrapper>
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
                  </RemoveFromPDFWrapper>
                  <TitleWrapper
                    pdfImageSrc={`${IMAGE_PATH}/country_${countryCode}.png`}
                  >
                    <StyledPageTitle>{countryTitle}</StyledPageTitle>
                  </TitleWrapper>
                  <RemoveFromPDFWrapper>
                    <p style={{ fontSize: '21px', lineHeight: '38px' }}>
                      <FormattedMessage
                        {...messages.header.a}
                        values={messageValues}
                      />
                    </p>
                    <p style={{ fontSize: '21px', lineHeight: '38px' }}>
                      <FormattedMessage
                        {...messages.header.b}
                        values={messageValues}
                      />
                    </p>
                  </RemoveFromPDFWrapper>
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <GImage
                      src={`${IMAGE_PATH}/country_${countryCode}.png`}
                      fit="cover"
                    />
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </div>
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
                    onMetricClick={onMetricClick}
                    messageValues={messageValues}
                    activeCode={activeCode}
                  />
                ),
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
                    onMetricClick={onMetricClick}
                    activeCode={activeCode}
                    messageValues={messageValues}
                    closeAsideLayer={() => onSetAsideLayer(false)}
                  />
                ),
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
                    onMetricClick={onMetricClick}
                    activeCode={activeCode}
                    messageValues={messageValues}
                  />
                ),
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
                    onMetricClick={onMetricClick}
                    activeCode={activeCode}
                    messageValues={messageValues}
                  />
                ),
              },
              {
                key: 'atrisk',
                title: intl.formatMessage(rootMessages.tabs['people-at-risk']),
                content: props =>
                  atRisk && (
                    <TabCountryPeople
                      {...props}
                      data={atRisk}
                      countryTitle={countryTitle}
                      countryCode={countryCode}
                      messageValues={messageValues}
                      highlight={highlightGroup}
                      setHighlight={onSetHighlightGroup}
                      content={content}
                      keys={keys}
                      onSelectCountry={onSelectCountry}
                    />
                  ),
              },
              {
                key: 'pacific-region-data',
                title: intl.formatMessage(rootMessages.tabs.pacific),
                content: props =>
                  pacificScores.length > 0 && (
                    <TabCountryPacific
                      {...props}
                      data={pacificScores}
                      countryTitle={countryTitle}
                      countryCode={countryCode}
                      messageValues={messageValues}
                      highlight={highlightGroup}
                      setHighlight={onSetHighlightGroup}
                      content={content}
                      keys={keys}
                      onSelectCountry={onSelectCountry}
                      onSetAsideLayer={onSetAsideLayer}
                    />
                  ),
              },
              {
                aside: true,
                key: 'about',
                title: intl.formatMessage(rootMessages.tabs.about),
                content: props => {
                  let faqs = null;
                  if (
                    props &&
                    (props.active === 0 || props.active === 'snapshot')
                  ) {
                    faqs = FAQS.COUNTRY_SNAPSHOT;
                  }
                  if (props && props.active === 'report-esr') {
                    faqs = FAQS.COUNTRY_ESR;
                  }
                  if (
                    props &&
                    (props.active === 'report-physint' ||
                      props.active === 'report-empowerment')
                  ) {
                    faqs = FAQS.COUNTRY_CPR;
                  }
                  if (props && props.active === 'pacific-region-data') {
                    faqs = FAQS.COUNTRY_PACIFIC;
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
  activeCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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
  onSetAsideLayer: PropTypes.func,
  asideLayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  highlightGroup: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSetHighlightGroup: PropTypes.func,
  content: PropTypes.object,
  onLoadContent: PropTypes.func,
  onSelectCountry: PropTypes.func,
  pacificScores: PropTypes.object,
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
  asideLayer: state => getAsideLayer(state),
  activeCode: state => getAsideLayerActiveCode(state),
  highlightGroup: state => getAtRiskSearch(state),
  content: state => getContent(state),
  pacificScores: (state, { match }) =>
    getLatestPacificScoresForCountry(state, match.params.country),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetHighlightGroup: code => {
      dispatch(setHighlightGroup(code));
    },
    onSetAsideLayer: config => {
      dispatch(setAsideLayer(config));
    },
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onCategoryClick: (key, value) => {
      const deleteParams = COUNTRY_FILTERS.ALL;
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
    onLoadContent: path => {
      // N.B. loading pacific data through this now, gets contentType of 'atrisk' which is not really accurate, but allows us to easily use the airtable loading path for now
      if (Array.isArray(path)) {
        path.forEach(p => dispatch(loadContentIfNeeded(p, 'atrisk')));
      } else {
        dispatch(loadContentIfNeeded(path, 'atrisk'));
      }
    },
    onSelectCountry: (countryCode, peopleCode) => {
      dispatch(selectCountry(countryCode, 'atrisk', peopleCode));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathCountry)));
