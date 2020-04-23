/**
 *
 * TabCountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import {
  COLUMNS,
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  STANDARDS,
} from 'containers/App/constants';

import ChartContainerCountryRights from 'containers/ChartContainerCountryRights';
import ChartContainerCountryIndicators from 'containers/ChartContainerCountryIndicators';
import ChartContainerTrend from 'containers/ChartContainerTrend';
import ChartContainerPeople from 'containers/ChartContainerPeople';
import ChartContainerByGroup from 'containers/ChartContainerByGroup';

import ChartHeader from 'components/ChartHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import ChartSettingMetrics from 'components/ChartSettingMetrics';
// import SectionContainer from 'styled/SectionContainer';

import quasiEquals from 'utils/quasi-equals';

const SectionContainer = styled.div``;

function TabCountryReport({
  type,
  dimension,
  country,
  allIndicators,
  standard,
  dataReady,
  hasDimensionScore,
  onMetricClick,
  messageValues,
  activeCode,
}) {
  const currentStandard = STANDARDS.find(s => s.key === standard);
  return (
    <>
      {!dataReady && <LoadingIndicator />}
      {dataReady && type === 'esr' && (
        <>
          <SectionContainer>
            <ChartContainerCountryRights
              type={type}
              dimensionCode={dimension}
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
              countryMessageValues={messageValues}
              activeCode={activeCode}
            />
          </SectionContainer>
          <SectionContainer>
            <ChartSettingMetrics
              activeDefault={
                RIGHTS.filter(r => r.dimension === dimension && r.hasGroups)[0]
                  .key
              }
              metrics={RIGHTS.filter(r => r.dimension === 'esr')}
              chart={props => (
                <ChartContainerCountryIndicators
                  countryCode={country[COLUMNS.COUNTRIES.CODE]}
                  onMetricClick={onMetricClick}
                  activeCode={activeCode}
                  {...props}
                />
              )}
              header={props => (
                <ChartHeader
                  chartId="indicators"
                  includeChartName
                  tools={{
                    howToReadConfig: {
                      key: 'country-indicators',
                      chart: 'Bar',
                      dimension: 'esr',
                    },
                    settingsConfig: {
                      key: 'country-indicators',
                      showStandard: true,
                      showBenchmark: true,
                    },
                  }}
                  {...props}
                />
              )}
              countryMessageValues={messageValues}
              chartId="indicators"
            />
          </SectionContainer>
          <SectionContainer>
            <ChartSettingMetrics
              activeDefault={
                RIGHTS.filter(r => r.dimension === dimension && r.hasGroups)[0]
                  .key
              }
              metrics={RIGHTS.reduce((rights, r) => {
                if (r.dimension !== dimension || !r.hasGroups) {
                  return rights;
                }
                return [
                  ...rights,
                  {
                    ...r,
                    children: INDICATORS.reduce((inds, i) => {
                      const info = allIndicators.find(ii =>
                        quasiEquals(ii.metric_code, i.code),
                      );
                      if (
                        i.right === r.key &&
                        (info.standard === 'Both' ||
                          info.standard === currentStandard.code)
                      ) {
                        return [...inds, i];
                      }
                      return inds;
                    }, []),
                  },
                ];
              }, [])}
              chart={props => (
                <ChartContainerByGroup
                  countryCode={country[COLUMNS.COUNTRIES.CODE]}
                  {...props}
                />
              )}
              header={props => (
                <ChartHeader
                  chartId="sex"
                  includeChartName
                  tools={{
                    howToReadConfig: {
                      key: 'country-sex',
                      chart: 'Bar',
                      dimension: 'esr',
                    },
                    settingsConfig: {
                      key: 'country-sex',
                      showStandard: true,
                      showBenchmark: true,
                    },
                  }}
                  {...props}
                />
              )}
              countryMessageValues={messageValues}
              chartId="sex"
            />
          </SectionContainer>
          <SectionContainer>
            <ChartSettingMetrics
              activeDefault="esr"
              metrics={DIMENSIONS.reduce((dims, d) => {
                if (d.key !== dimension) {
                  return dims;
                }
                return [
                  ...dims,
                  {
                    ...d,
                    children: RIGHTS.reduce((rights, r) => {
                      if (r.dimension !== d.key) {
                        return rights;
                      }
                      return [
                        ...rights,
                        {
                          ...r,
                          children: INDICATORS.reduce((inds, i) => {
                            const info = allIndicators.find(ii =>
                              quasiEquals(ii.metric_code, i.code),
                            );
                            if (
                              i.right === r.key &&
                              (info.standard === 'Both' ||
                                info.standard === currentStandard.code)
                            ) {
                              return [...inds, i];
                            }
                            return inds;
                          }, []),
                        },
                      ];
                    }, []),
                  },
                ];
              }, [])}
              chart={props => (
                <ChartContainerTrend
                  countryCode={country[COLUMNS.COUNTRIES.CODE]}
                  {...props}
                />
              )}
              header={props => (
                <ChartHeader
                  chartId="trend"
                  includeChartName
                  tools={{
                    settingsConfig: {
                      key: 'country-trend',
                      showStandard: true,
                      showBenchmark: true,
                    },
                  }}
                  {...props}
                />
              )}
              countryMessageValues={messageValues}
              chartId="trend"
            />
          </SectionContainer>
          <SectionContainer>
            <ChartSettingMetrics
              activeDefault={
                RIGHTS.filter(r => r.dimension === dimension)[0].key
              }
              metrics={RIGHTS.reduce((rights, r) => {
                if (r.dimension !== dimension) {
                  return rights;
                }
                return [...rights, r];
              }, [])}
              chart={props => (
                <ChartContainerPeople
                  countryCode={country[COLUMNS.COUNTRIES.CODE]}
                  {...props}
                />
              )}
              header={props => (
                <ChartHeader chartId="people" includeChartName {...props} />
              )}
              countryMessageValues={messageValues}
              chartId="people"
            />
          </SectionContainer>
        </>
      )}
      {dataReady && type === 'cpr' && dimension === 'physint' && (
        <>
          <SectionContainer>
            <ChartContainerCountryRights
              type={type}
              dimensionCode={dimension}
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
              activeCode={activeCode}
              countryMessageValues={messageValues}
            />
          </SectionContainer>
          {hasDimensionScore && (
            <>
              <SectionContainer>
                <ChartSettingMetrics
                  activeDefault={dimension}
                  metrics={DIMENSIONS.reduce((dims, d) => {
                    if (d.key !== dimension) {
                      return dims;
                    }
                    return [
                      ...dims,
                      {
                        ...d,
                        children: RIGHTS.reduce((rights, r) => {
                          if (r.dimension !== d.key) {
                            return rights;
                          }
                          return [...rights, r];
                        }, []),
                      },
                    ];
                  }, [])}
                  chart={props => (
                    <ChartContainerTrend
                      countryCode={country[COLUMNS.COUNTRIES.CODE]}
                      {...props}
                    />
                  )}
                  header={props => (
                    <ChartHeader chartId="trend" includeChartName {...props} />
                  )}
                  countryMessageValues={messageValues}
                  chartId="trend"
                />
              </SectionContainer>
              <SectionContainer>
                <ChartSettingMetrics
                  activeDefault={
                    RIGHTS.filter(r => r.dimension === dimension)[0].key
                  }
                  metrics={RIGHTS.reduce((rights, r) => {
                    if (r.dimension !== dimension) {
                      return rights;
                    }
                    return [...rights, r];
                  }, [])}
                  chart={props => (
                    <ChartContainerPeople
                      countryCode={country[COLUMNS.COUNTRIES.CODE]}
                      {...props}
                    />
                  )}
                  header={props => (
                    <ChartHeader chartId="people" includeChartName {...props} />
                  )}
                  countryMessageValues={messageValues}
                  chartId="people"
                />
              </SectionContainer>
            </>
          )}
        </>
      )}
      {dataReady && type === 'cpr' && dimension === 'empowerment' && (
        <>
          <SectionContainer>
            <ChartContainerCountryRights
              type={type}
              dimensionCode={dimension}
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
              activeCode={activeCode}
              countryMessageValues={messageValues}
            />
          </SectionContainer>
          {hasDimensionScore && (
            <>
              <SectionContainer>
                <ChartSettingMetrics
                  activeDefault={dimension}
                  metrics={DIMENSIONS.reduce((dims, d) => {
                    if (d.key !== dimension) {
                      return dims;
                    }
                    return [
                      ...dims,
                      {
                        ...d,
                        children: RIGHTS.reduce((rights, r) => {
                          if (r.dimension !== d.key) {
                            return rights;
                          }
                          return [...rights, r];
                        }, []),
                      },
                    ];
                  }, [])}
                  chart={props => (
                    <ChartContainerTrend
                      countryCode={country[COLUMNS.COUNTRIES.CODE]}
                      {...props}
                    />
                  )}
                  header={props => (
                    <ChartHeader chartId="trend" includeChartName {...props} />
                  )}
                  countryMessageValues={messageValues}
                  chartId="trend"
                />
              </SectionContainer>
              <SectionContainer>
                <ChartSettingMetrics
                  activeDefault={
                    RIGHTS.filter(r => r.dimension === dimension)[0].key
                  }
                  metrics={RIGHTS.reduce((rights, r) => {
                    if (r.dimension !== dimension) {
                      return rights;
                    }
                    return [...rights, r];
                  }, [])}
                  chart={props => (
                    <ChartContainerPeople
                      countryCode={country[COLUMNS.COUNTRIES.CODE]}
                      {...props}
                    />
                  )}
                  header={props => (
                    <ChartHeader chartId="people" includeChartName {...props} />
                  )}
                  countryMessageValues={messageValues}
                  chartId="people"
                />
              </SectionContainer>
            </>
          )}
        </>
      )}
    </>
  );
}

TabCountryReport.propTypes = {
  hasAside: PropTypes.bool,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  hasDimensionScore: PropTypes.bool,
  type: PropTypes.string,
  activeCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimension: PropTypes.string,
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onMetricClick: PropTypes.func,
  messageValues: PropTypes.object,
};

// export default injectIntl(TabCountryReport);
export default TabCountryReport;
