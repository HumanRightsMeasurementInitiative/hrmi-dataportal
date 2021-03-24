/**
 *
 * AboutMetricSources
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, Text, Button } from 'grommet';

import { STANDARDS, INDICATORS } from 'containers/App/constants';

import {
  getESRIndicators,
  getAlternativeIndicatorCountrySources,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import UL from 'styled/UL';

import rootMessages from 'messages';
import messages from './messages';

const StyledUL = styled(UL)`
  margin-top: 0;
`;

const StyledNonButton = styled(Button)`
  font-weight: bold;
  cursor: initial;
`;

const DEPENDENCIES = ['esrIndicators', 'sources'];

const expandSource = (source, intl) => {
  const sourcesAsArray = source.split(',');
  return sourcesAsArray.reduce((memo, s) => {
    const formatted = rootMessages.sources[s]
      ? intl.formatMessage(rootMessages.sources[s])
      : s;
    return memo === '' ? formatted : `${memo}, ${formatted}`;
  }, '');
};

const getStandards = (standard, intl) => {
  const standards = STANDARDS.filter(
    as => standard === 'Both' || standard === as.code,
  );
  return standards.reduce((memo, s) => {
    const formatted = intl.formatMessage(rootMessages.settings.standard[s.key]);
    return memo === '' ? formatted : `${memo}, ${formatted}`;
  }, '');
};
export function AboutMetricSources({
  metric,
  indicatorInfo,
  allIndicators,
  onLoadData,
  // onSelectMetric,
  intl,
  countrySources,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, [metric]);

  if (metric.type === 'cpr') {
    return null;
  }

  const { metricType } = metric;

  let indicators;
  if (allIndicators && metricType !== 'indicators') {
    // const as = STANDARDS.find(s => s.key === standard);
    // console.log('as', as)
    if (metricType === 'rights') {
      indicators = INDICATORS.reduce((memo, i) => {
        if (i.right !== metric.key) {
          return memo;
        }
        const indicator = allIndicators.find(ii => ii.metric_code === i.code);
        return [
          ...memo,
          {
            key: i.key,
            standards: STANDARDS.filter(
              as =>
                indicator.standard === 'Both' || indicator.standard === as.code,
            ),
            ...indicator,
          },
        ];
      }, []);
    }
    if (metricType === 'dimensions') {
      indicators = INDICATORS.map(i => {
        const indicator = allIndicators.find(ii => ii.metric_code === i.code);
        return {
          key: i.key,
          standards: STANDARDS.filter(
            as =>
              indicator.standard === 'Both' || indicator.standard === as.code,
          ),
          ...indicator,
        };
      });
    }
  }
  const isAggregateMetric =
    metricType === 'rights' || metricType === 'dimensions';
  const sourceCodes =
    indicatorInfo &&
    indicatorInfo.source_codes &&
    indicatorInfo.source_codes.split(',');
  // prettier-ignore
  return (
    <Box>
      {metricType === 'indicators' &&
        indicatorInfo &&
        (!countrySources || countrySources.length === 0) && (
          <>
            {sourceCodes.length === 1 && (
              <>
                {rootMessages.sources[sourceCodes[0]] && (
                  <FormattedMessage {...rootMessages.sources[sourceCodes[0]]} />
                )}
                {!rootMessages.sources[sourceCodes[0]] && sourceCodes[0]}
              </>
            )}
            {sourceCodes.length > 1 && (
              <StyledUL>
                {sourceCodes.map(source => (
                  <li key={source}>
                    {rootMessages.sources[source] && (
                      <FormattedMessage {...rootMessages.sources[source]} />
                    )}
                    {!rootMessages.sources[source] && source}
                  </li>
                ))}
              </StyledUL>
            )}
          </>
      )}
      {metricType === 'indicators' && countrySources && countrySources.length > 0 && (
        <>
          <Text weight={600}>
            <FormattedMessage {...messages.nationalSources} />
          </Text>
          {countrySources.length === 1 && (
            <span>
              {countrySources[0].description || countrySources[0].source_code}
            </span>
          )}
          {countrySources.length > 1 && (
            <StyledUL>
              {countrySources.map(s => (
                <li key={s.source_code}>
                  {s.description || s.source_code}
                </li>
              ))}
            </StyledUL>
          )}
        </>
      )}
      {isAggregateMetric && indicators && (
        <div>
          {indicators.map(i =>
            i.source_codes ? (
              <Box margin={{ bottom: 'small' }} key={i.key}>
                <div>
                  <StyledNonButton>
                    <Text size="small">
                      <FormattedMessage
                        {...rootMessages['indicators-raw'][i.key]}
                      />
                    </Text>
                  </StyledNonButton>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text size="xsmall">
                    <FormattedMessage
                      {...rootMessages['indicators-definition'][i.key]}
                    />
                  </Text>
                </div>
                <div>
                  <Text size="xsmall">
                    <FormattedMessage {...messages.titleSourceShort} />
                  </Text>
                  <Text size="xsmall">
                    {`: ${expandSource(i.source_codes, intl)}`}
                  </Text>
                </div>
                <div>
                  <Text size="xsmall">
                    <FormattedMessage {...messages.titleStandards} />
                  </Text>
                  <Text size="xsmall">
                    {`: ${getStandards(i.standard, intl)}`}
                  </Text>
                </div>
              </Box>
            ) : null,
          )}
        </div>
      )}
    </Box>
  );
}

AboutMetricSources.propTypes = {
  metric: PropTypes.object,
  indicatorInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSelectMetric: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  sources: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countrySources: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  countryCode: PropTypes.string,
  dateRange: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allIndicators: (state, { metric }) => {
    if (metric.metricType !== 'indicators' && metric.type === 'esr') {
      return getESRIndicators(state);
    }
    return false;
  },
  countrySources: (state, { countryCode, metric, dateRange }) => {
    if (metric.metricType === 'indicators') {
      return getAlternativeIndicatorCountrySources(state, {
        countryCode,
        metricCode: metric.code,
        dateRange,
      });
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: metric => {
      if (metric.metricType === 'indicators') {
        return DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
      }
      return false;
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutMetricSources));
