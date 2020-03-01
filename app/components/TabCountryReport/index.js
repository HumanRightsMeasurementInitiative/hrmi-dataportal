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

import ChartContainerCountryDimension from 'containers/ChartContainerCountryDimension';
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
  // trackEvent,
  // raw,
}) {
  const currentStandard = STANDARDS.find(s => s.key === standard);
  return (
    <>
      {!dataReady && <LoadingIndicator />}
      {dataReady && type === 'esr' && (
        <>
          <SectionContainer>
            <ChartContainerCountryDimension
              type={type}
              dimensionCode={dimension}
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
            />
          </SectionContainer>
          <SectionContainer>
            <ChartContainerCountryIndicators
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
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
                  title="By Group"
                  tools={{
                    howToReadConfig: {
                      key: 'country-dimension-esr',
                      chart: 'Bar',
                    },
                    settingsConfig: {
                      key: 'country-dimension-esr',
                      showStandard: true,
                      showBenchmark: true,
                    },
                  }}
                  {...props}
                />
              )}
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
                  title="Over time"
                  tools={{
                    settingsConfig: {
                      key: 'country-dimension-esr',
                      showStandard: true,
                      showBenchmark: true,
                    },
                  }}
                  {...props}
                />
              )}
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
                <ChartHeader title="People at risk" {...props} />
              )}
            />
          </SectionContainer>
        </>
      )}
      {dataReady && type === 'cpr' && dimension === 'physint' && (
        <>
          <SectionContainer>
            <ChartContainerCountryDimension
              type={type}
              dimensionCode={dimension}
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
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
                  header={props => <ChartHeader title="Over time" {...props} />}
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
                    <ChartHeader title="People at risk" {...props} />
                  )}
                />
              </SectionContainer>
            </>
          )}
        </>
      )}
      {dataReady && type === 'cpr' && dimension === 'empowerment' && (
        <>
          <SectionContainer>
            <ChartContainerCountryDimension
              type={type}
              dimensionCode={dimension}
              countryCode={country[COLUMNS.COUNTRIES.CODE]}
              onMetricClick={onMetricClick}
            />
          </SectionContainer>
          {hasDimensionScore && (
            <>
              <SectionContainer>
                Category, rights & indicators over time
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
                />
              </SectionContainer>
              <SectionContainer>
                People at risk word cloud && commentary
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
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimension: PropTypes.string,
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onMetricClick: PropTypes.func,
};

// export default injectIntl(TabCountryReport);
export default TabCountryReport;
