/**
 *
 * CountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// import { Heading } from 'grommet';

import {
  COLUMNS,
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  STANDARDS,
} from 'containers/App/constants';
import ChartContainerTrend from 'containers/ChartContainerTrend';
import LoadingIndicator from 'components/LoadingIndicator';
import ChartMetricSelector from 'components/ChartMetricSelector';
import MainColumn from 'styled/MainColumn';
import SectionContainer from 'styled/SectionContainer';

import quasiEquals from 'utils/quasi-equals';
//
// import messages from './messages';
//
// // prettier-ignore
// const StyledHeading = styled(Heading)`
//   font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
//   line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//     font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
//     line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
//   }
// `;

// dimensions,
// rights,
// benchmark,
// standard,
// indicators,
// country,
// countryGrammar,
// onMetricClick,
// intl,
// atRiskData,
// onAtRiskClick,
// reference,
// esrYear,
// trackEvent,

function CountryReport({
  dataReady,
  hasAside,
  type,
  dimension,
  country,
  allIndicators,
  standard,
}) {
  const standardInfo = STANDARDS.find(s => s.key === standard);
  return (
    <MainColumn hasAside={hasAside}>
      {!dataReady && <LoadingIndicator />}
      {dataReady && type === 'esr' && (
        <>
          <SectionContainer>ESR Summary Chart</SectionContainer>
          <SectionContainer>
            ESR Narrative & Comparative Assessment
          </SectionContainer>
          <SectionContainer>Indicators by right</SectionContainer>
          <SectionContainer>Rights and indicators by sex</SectionContainer>
          <SectionContainer>
            Category, rights & indicators over time
            <ChartMetricSelector
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
                                info.standard === standardInfo.code)
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
            />
          </SectionContainer>
          <SectionContainer>
            People at risk word cloud and narrative
          </SectionContainer>
        </>
      )}
      {dataReady && type === 'cpr' && dimension === 'physint' && (
        <>
          <SectionContainer>Safety Summary Chart</SectionContainer>
          <SectionContainer>
            Safety Narrative & Comparative Assessment
          </SectionContainer>
          <SectionContainer>
            Category, rights & indicators over time
            <ChartMetricSelector
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
            People at risk word cloud and narrative
          </SectionContainer>
        </>
      )}
      {dataReady && type === 'cpr' && dimension === 'empowerment' && (
        <>
          <SectionContainer>Empowerment Summary Chart</SectionContainer>
          <SectionContainer>
            Empowerment Narrative & Comparative Assessment
          </SectionContainer>
          <SectionContainer>
            Category, rights & indicators over time
            <ChartMetricSelector
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
            People at risk word cloud and narrative
          </SectionContainer>
        </>
      )}
    </MainColumn>
  );
}

CountryReport.propTypes = {
  hasAside: PropTypes.bool,
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  type: PropTypes.string,
  dimension: PropTypes.string,
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // countryTitle: PropTypes.string,
  // onMetricClick: PropTypes.func,
  // onAtRiskClick: PropTypes.func,
  // trackEvent: PropTypes.func,
  // reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // intl: intlShape.isRequired,
  // esrYear: PropTypes.number,
};

// export default injectIntl(CountryReport);
export default CountryReport;
