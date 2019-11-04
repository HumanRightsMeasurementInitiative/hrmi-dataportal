/**
 *
 * CountryMetric
 *
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled, { withTheme } from 'styled-components';
import { Box } from 'grommet';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import CountryMetricPeople from 'components/CountryMetricPeople';
import CountryAbout from 'components/CountryAbout';
import MetricTrend from 'components/MetricTrend';
import MetricAbout from 'components/MetricAbout';
import Close from 'containers/Close';
import TabContainer from 'containers/TabContainer';
import ButtonText from 'styled/ButtonText';

import {
  RIGHTS,
  STANDARDS,
  BENCHMARKS,
  COLUMNS,
} from 'containers/App/constants';
import ContentContainer from 'styled/ContentContainer';

import getMetricDetails from 'utils/metric-details';

import {
  getCountry,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getPeopleAtRisk,
  getModalTabSearch,
  getContentByKey,
  getESRScoresForCountry,
  getCPRScoresForCountry,
  getESRIndicatorScoresForCountry,
  getHasCountryCPR,
  getAuxIndicatorsForCountry,
  getIndicatorInfo,
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
} from 'containers/App/selectors';

import {
  navigate,
  setModalTab,
  selectCountry,
  selectMetric,
  loadContentIfNeeded,
  loadDataIfNeeded,
  setStandard,
  setBenchmark,
} from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import PageTitle from 'styled/PageTitle';

import rootMessages from 'messages';

// const PageTitle = props => (
//   <Heading responsive={false} level="2" margin="none" {...props} />
// );

const StyledPageTitle = styled(PageTitle)`
  font-weight: ${({ base }) => (base ? 400 : 600)};
`;

const StyledButtonText = styled(ButtonText)``;

const StyledContent = styled(Box)`
  margin: 0 auto;
  position: relative;
  min-height: auto;
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  width: 90vw;
  max-width: none;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: ${({ theme }) => theme.breakpointsMin.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.large};
    width: ${({ theme }) => theme.breakpointsMin.large};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.xlarge}) {
    width: ${({ theme }) => theme.breakpointsMin.xlarge};
  }
`;

const Content = props => (
  <StyledContent direction="row" responsive={false} {...props} />
);

const TitleWrap = styled(Box)`
  padding-top: ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-top: 0;
  }
`;

const getSubrights = metric => RIGHTS.filter(r => r.aggregate === metric.key);

const hasSubrights = metric => {
  const subrights = getSubrights(metric);
  return subrights.length > 0;
};

const hasAnalysis = metric =>
  metric.metricType === 'rights' ||
  (metric.metricType === 'dimensions' && metric.key === 'esr');
const hasSubrightAnalysis = metric =>
  metric.metricType === 'rights' && hasSubrights(metric);

const generateKey = (metricCode, countryCode) => {
  const metric = getMetricDetails(metricCode);
  if (hasAnalysis(metric)) {
    if (metric.metricType === 'rights') {
      if (metric.type === 'esr') {
        return `esr/${countryCode}`;
      }
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
const getColour = metric => {
  if (metric.metricType === 'dimensions') {
    return metric.key;
  }
  if (metric.metricType === 'rights') {
    return metric.dimension;
  }
  return 'esr';
};
const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
  'auxIndicators',
  'atRisk',
];
export function CountryMetric({
  metricCode,
  countryCode,
  onClose,
  onSelectCountry,
  onSelectMetric,
  base,
  intl,
  atRisk,
  atRiskAnalysis,
  atRiskAnalysisSubrights,
  onLoadContent,
  scores,
  hasAtRisk,
  onCategoryClick,
  auxIndicators,
  country,
  onLoadData,
  metricInfo,
  benchmark,
  standard,
  maxYearESR,
  maxYearCPR,
  minYearESR,
  minYearCPR,
  theme,
  onSetBenchmark,
  onSetStandard,
}) {
  const layerRef = useRef();
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    const key = generateKey(metricCode, countryCode);
    if (key && hasAtRisk) onLoadContent(key);
    onLoadData();
  }, [metricCode, countryCode, hasAtRisk]);

  useEffect(() => {
    if (layerRef && layerRef.current) {
      disableBodyScroll(layerRef.current);
    }
    return () => {
      clearAllBodyScrollLocks();
      // make sure overflow is really set back to auto
      setTimeout(() => {
        document.body.setAttribute('style', 'overflow:auto');
      }, 0);
    };
  }, [layerRef]);

  const metric = getMetricDetails(metricCode);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const countryTitle =
    countryCode && intl.formatMessage(rootMessages.countries[countryCode]);
  const metricTitle =
    metric && intl.formatMessage(rootMessages[metric.metricType][metric.key]);
  const isESR = metric.metricType === 'indicators' || metric.type === 'esr';

  // prettier-ignore
  return (
    <Box overflow="auto" direction="column" ref={layerRef}>
      <Helmet>
        <title>{`${countryTitle} - ${metricTitle}`}</title>
        <meta name="description" content="Description of Country Metric page" />
      </Helmet>
      <ContentContainer direction="column" header>
        <Content>
          <Close
            topRight
            float={false}
            onClick={() => {
              enableBodyScroll(layerRef.current);
              onClose(base, base === 'country' ? countryCode : metricCode);
            }}
          />
          <TitleWrap direction="column" align="start" responsive={false}>
            <StyledPageTitle base level="2">
              {base === 'metric' ? metricTitle : countryTitle}
            </StyledPageTitle>
            <StyledButtonText
              onClick={() => {
                if (base === 'metric') {
                  onSelectCountry(countryCode);
                } else {
                  onSelectMetric(metricCode);
                }
              }}
            >
              <StyledPageTitle level="2">
                {base === 'metric' ? countryTitle : metricTitle}
              </StyledPageTitle>
            </StyledButtonText>
          </TitleWrap>
        </Content>
      </ContentContainer>
      <Content>
        <TabContainer
          aside={false}
          modal
          tabs={[
            {
              key: 'atrisk',
              title: intl.formatMessage(rootMessages.tabs['people-at-risk']),
              titleMobile: intl.formatMessage(
                rootMessages.tabs['people-at-risk'],
              ),
              // howToRead: {
              //   contxt: 'CountryMetric',
              //   chart: 'WordCloud',
              //   data: 'atRisk',
              // },
              content:
                hasAtRisk &&
                metric.metricType !== 'indicators' &&
                (props => (
                  <CountryMetricPeople
                    data={atRisk}
                    metric={metric}
                    atRiskAnalysis={atRiskAnalysis}
                    atRiskAnalysisSubrights={atRiskAnalysisSubrights}
                    locale={intl.locale}
                    hasAnalysis={hasAnalysis(metric)}
                    hasSubrightAnalysis={hasSubrightAnalysis(metric)}
                    {...props}
                  />
                )),
            },
            {
              key: 'trend',
              title: intl.formatMessage(rootMessages.tabs.trend),
              titleMobile: intl.formatMessage(
                rootMessages.tabs.mobile.trend,
              ),
              // howToRead: {
              //   contxt: 'CountryMetric',
              //   chart: 'Trend',
              //   data: metric.type,
              // },
              content: props => (
                <MetricTrend
                  color={theme.global.colors[getColour(metric)]}
                  colorHint={theme.global.colors[`${getColour(metric)}Dark`]}
                  scores={scores}
                  percentage={isESR}
                  maxValue={isESR ? 100 : 11}
                  maxYear={isESR ? maxYearESR : maxYearCPR}
                  minYear={isESR ? minYearESR : minYearCPR}
                  column={isESR ? currentBenchmark.column : COLUMNS.CPR.MEAN}
                  rangeColumns={
                    !isESR && {
                      upper: COLUMNS.CPR.HI,
                      lower: COLUMNS.CPR.LO,
                    }
                  }
                  hasBenchmarkOption={isESR}
                  hasStandardOption={
                    isESR && metric.metricType !== 'indicators'
                  }
                  onSetBenchmark={onSetBenchmark}
                  onSetStandard={onSetStandard}
                  standard={standard}
                  benchmark={benchmark}
                  {...props}
                />
              ),
            },
            {
              key: 'about',
              title: `${intl.formatMessage(rootMessages.tabs.about)}`,
              titleMobile: `${intl.formatMessage(
                rootMessages.tabs.about,
              )}`,
              content: props => (
                <>
                  {country &&
                  auxIndicators && (
                    <CountryAbout
                      country={country}
                      auxIndicators={auxIndicators}
                      onCategoryClick={onCategoryClick}
                      {...props}
                    />
                  )}
                  <MetricAbout
                    metric={metric}
                    metricInfo={metricInfo}
                    fullInfo
                    standard={
                      metric.metricType === 'indicators'
                        ? STANDARDS.find(s => metricInfo.standard === s.code)
                        : null
                    }
                    {...props}
                  />
                </>
              ),
            },
          ]}
        />
      </Content>
    </Box>
  );
}

CountryMetric.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  onSelectMetric: PropTypes.func,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  onLoadContent: PropTypes.func,
  onLoadData: PropTypes.func,
  onSelectCountry: PropTypes.func,
  onCategoryClick: PropTypes.func,
  metricCode: PropTypes.string,
  countryCode: PropTypes.string,
  base: PropTypes.string,
  benchmark: PropTypes.string,
  standard: PropTypes.string,
  hasAtRisk: PropTypes.bool,
  maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  atRisk: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysisSubrights: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  maxYearESR: state => getMaxYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearESR: state => getMinYearESR(state),
  minYearCPR: state => getMinYearCPR(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  tabIndex: state => getModalTabSearch(state),
  atRisk: (state, { countryCode, metricCode }) =>
    getPeopleAtRisk(state, {
      country: countryCode,
      metric: metricCode,
    }),
  atRiskAnalysis: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    return (
      !hasSubrights(metric) &&
      getContentByKey(state, generateKey(metricCode, countryCode))
    );
  },
  atRiskAnalysisSubrights: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (hasSubrights(metric)) {
      const subrights = getSubrights(metric);
      // console.log(subrights)
      return subrights.map(sr => {
        const content = getContentByKey(
          state,
          generateKey(sr.key, countryCode),
        );
        return {
          ...content,
          key: sr.key,
        };
      });
    }
    return false;
  },
  hasAtRisk: (state, { countryCode }) => getHasCountryCPR(state, countryCode),
  scores: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'dimensions' || metric.metricType === 'rights') {
      if (metric.type === 'esr') {
        return getESRScoresForCountry(state, {
          countryCode,
          metric,
        });
      }
      return getCPRScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    if (metric.metricType === 'indicators') {
      return getESRIndicatorScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    return false;
  },
  auxIndicators: (state, { countryCode }) =>
    getAuxIndicatorsForCountry(state, countryCode),
  country: (state, { countryCode }) => getCountry(state, countryCode),
  metricInfo: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onCategoryClick: (key, value) => {
      const deleteParams = ['income', 'region', 'assessed'];
      dispatch(
        navigate(
          { pathname: '', search: `?${key}=${value}` },
          {
            replace: false,
            deleteParams: deleteParams.filter(p => p !== key),
            trackEvent: {
              category: 'Data',
              action: 'Country filter (country-metric, tags)',
              value: `${key}/${value}`,
            },
          },
        ),
      );
    },
    onLoadContent: path => {
      if (Array.isArray(path)) {
        path.forEach(p => dispatch(loadContentIfNeeded(p, 'atrisk')));
      } else {
        dispatch(loadContentIfNeeded(path, 'atrisk'));
      }
    },
    onTabClick: index => dispatch(setModalTab(index)),
    onSelectCountry: country => dispatch(selectCountry(country)),
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
    onClose: (base, code) =>
      dispatch(
        navigate(
          {
            pathname: `/${base}/${code}`,
          },
          {
            replace: false,
            deleteParams: ['mtab'],
            trackEvent: {
              category: 'Close modal',
              action: `Target: ${base}/${code}`,
            },
          },
        ),
      ),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(CountryMetric)));
