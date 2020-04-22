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
import { Box, Text } from 'grommet';

import { STANDARDS, INDICATORS } from 'containers/App/constants';

import { getESRIndicators } from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import UL from 'styled/UL';
import ButtonText from 'styled/ButtonText';

import rootMessages from 'messages';
import messages from './messages';

const StyledUL = styled(UL)`
  margin-top: 0;
`;
const Button = styled(ButtonText)`
  font-weight: 400;
`;
const DEPENDENCIES = ['esrIndicators'];

const expandSource = (source, intl) => {
  const sourcesAsArray = source.split(',');
  return sourcesAsArray.reduce((memo, s) => {
    const formatted = intl.formatMessage(rootMessages.sources[s]);
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
  onSelectMetric,
  intl,
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
  const rord = metricType === 'rights' || metricType === 'dimensions';
  return (
    <Box pad="small" background="light-1">
      {metricType === 'indicators' && indicatorInfo && (
        <StyledUL>
          {indicatorInfo.source_codes &&
            indicatorInfo.source_codes.split(',').map(source => (
              <li key={source}>
                <FormattedMessage {...rootMessages.sources[source]} />
              </li>
            ))}
        </StyledUL>
      )}
      {rord && indicators && (
        <div>
          {indicators.map(i =>
            i.source_codes ? (
              <Box margin={{ bottom: 'small' }} key={i.key}>
                <div>
                  <Button onClick={() => onSelectMetric(i.key)}>
                    <Text size="small">
                      <FormattedMessage
                        {...rootMessages['indicators-raw'][i.key]}
                      />
                    </Text>
                  </Button>
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
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allIndicators: (state, { metric }) => {
    if (metric.metricType !== 'indicators' && metric.type === 'esr') {
      return getESRIndicators(state);
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
