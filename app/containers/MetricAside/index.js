/**
 *
 * CountryAbout
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, Heading, Anchor, Text } from 'grommet';

import { lowerCase } from 'utils/string';

import MetricAbout from 'components/MetricAbout';
import { STANDARDS, RIGHTS, INDICATORS } from 'containers/App/constants';
import { getIndicatorInfo, getESRIndicators } from 'containers/App/selectors';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';

import rootMessages from 'messages';
import messages from './messages';

const DEPENDENCIES_INDICATORS = ['esrIndicators'];

export function MetricAside({
  metric,
  ancestors,
  metricInfo,
  allIndicators,
  onLoadData,
  onSelectMetric,
  intl,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, []);

  const { metricType } = metric;

  const standard =
    metricType === 'indicators'
      ? STANDARDS.find(s => metricInfo.standard === s.code)
      : null;

  let children = [];
  if (metricType === 'dimensions') {
    children = RIGHTS.filter(
      r => r.dimension === metric.key && typeof r.aggregate === 'undefined',
    );
  }
  if (metricType === 'rights' && metric.type === 'cpr') {
    children = RIGHTS.filter(r => r.aggregate === metric.key);
  }
  if (metricType === 'rights' && metric.type === 'esr') {
    children = STANDARDS.map(as => ({
      ...as,
      indicators: INDICATORS.filter(i => {
        const indicator = allIndicators.find(ii => ii.metric_code === i.code);
        return (
          i.right === metric.key &&
          (indicator.standard === 'Both' || indicator.standard === as.code)
        );
      }),
    }));
  }
  return (
    <Box direction="column">
      <MetricAbout
        metric={metric}
        metricInfo={metricInfo}
        standard={standard}
      />
      <Box direction="column" pad="medium">
        {metricType !== 'dimensions' && (
          <>
            <Heading level={4} margin={{ vertical: 'xsmall' }}>
              <FormattedMessage {...messages.titleParent[metricType]} />
            </Heading>
            <Box>
              <Anchor
                href="#"
                onClick={evt => {
                  if (evt) evt.preventDefault();
                  onSelectMetric(ancestors[ancestors.length - 1].key);
                }}
              >
                <FormattedMessage
                  {...rootMessages[ancestors[ancestors.length - 1].type][
                    ancestors[ancestors.length - 1].key
                  ]}
                />
              </Anchor>
            </Box>
          </>
        )}
        {metricType !== 'indicators' && children.length > 0 && (
          <>
            <Heading level={4} margin={{ vertical: 'xsmall' }}>
              {metricType === 'dimensions' && (
                <FormattedMessage {...messages.titleChildren[metricType]} />
              )}
              {metricType === 'rights' && (
                <FormattedMessage
                  {...messages.titleChildren[metricType][metric.type]}
                />
              )}
            </Heading>
            <Box>
              {((metricType === 'rights' && metric.type === 'cpr') ||
                metricType === 'dimensions') && (
                <ul>
                  {children.map(child => (
                    <li key={child.key}>
                      <Anchor
                        href="#"
                        onClick={evt => {
                          if (evt) evt.preventDefault();
                          onSelectMetric(child.key);
                        }}
                      >
                        <FormattedMessage {...rootMessages.rights[child.key]} />
                      </Anchor>
                    </li>
                  ))}
                </ul>
              )}
              {metricType === 'rights' && metric.type === 'esr' && (
                <>
                  {children.map(as => (
                    <div key={as.key}>
                      <Text>
                        {`'${intl.formatMessage(
                          rootMessages.settings.standard[as.key],
                        )}' ${lowerCase(
                          intl.formatMessage(
                            rootMessages.settings.standard.name,
                          ),
                        )}`}
                      </Text>
                      <ul>
                        {as.indicators.map(child => (
                          <li key={child.key}>
                            <Anchor
                              href="#"
                              onClick={evt => {
                                if (evt) evt.preventDefault();
                                onSelectMetric(child.key);
                              }}
                            >
                              <FormattedMessage
                                {...rootMessages.indicators[child.key]}
                              />
                            </Anchor>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

MetricAside.propTypes = {
  metric: PropTypes.object,
  onSelectMetric: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  ancestors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  metricInfo: (state, { metric }) => {
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
  allIndicators: (state, { metric }) => {
    if (metric.metricType === 'rights' && metric.type === 'esr') {
      return getESRIndicators(state);
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: metric => {
      if (metric.metricType === 'indicators') {
        return DEPENDENCIES_INDICATORS.forEach(key =>
          dispatch(loadDataIfNeeded(key)),
        );
      }
      return false;
    },
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(MetricAside));
