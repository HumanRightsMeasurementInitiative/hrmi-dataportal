/**
 *
 * CountryAbout
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, Heading, Paragraph, Anchor } from 'grommet';

// import { lowerCase } from 'utils/string';

import { STANDARDS, RIGHTS, INDICATORS } from 'containers/App/constants';
import { getIndicatorInfo } from 'containers/App/selectors';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';

import rootMessages from 'messages';
import messages from './messages';

const DEPENDENCIES_INDICATORS = ['esrIndicators'];

export function MetricAside({
  metric,
  // intl,
  ancestors,
  metricInfo,
  onLoadData,
  onSelectMetric,
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
    children = INDICATORS.filter(i => i.right === metric.key);
  }

  return (
    <Box direction="column" pad="medium">
      <Heading level={4} margin={{ vertical: 'xsmall' }}>
        <FormattedMessage {...messages.title[metricType]} />
      </Heading>
      <Box>
        <Paragraph>
          <FormattedMessage
            {...rootMessages[`${metricType}-about`][metric.key]}
          />
        </Paragraph>
      </Box>
      {metricType === 'indicators' && metricInfo && (
        <>
          <Box>
            <Heading level={5} margin={{ vertical: 'xsmall' }}>
              <FormattedMessage {...messages.titleSource} />
            </Heading>
            <Box>
              <ul>
                {metricInfo.source.split(',').map(source => (
                  <li key={source}>
                    <FormattedMessage {...rootMessages.sources[source]} />
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box>
            <Heading level={4} margin={{ vertical: 'xsmall' }}>
              <FormattedMessage {...messages.titleStandards} />
            </Heading>
            <Box>
              {metricInfo.standard === 'Both' && (
                <ul>
                  {STANDARDS.map(s => (
                    <li key={s.key}>
                      <FormattedMessage
                        {...rootMessages.settings.standard[s.key]}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {metricInfo.standard !== 'Both' && standard && (
                <ul>
                  <li>
                    <FormattedMessage
                      {...rootMessages.settings.standard[standard.key]}
                    />
                  </li>
                </ul>
              )}
            </Box>
          </Box>
        </>
      )}
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
                    {metricType === 'dimensions' && (
                      <FormattedMessage {...rootMessages.rights[child.key]} />
                    )}
                    {metricType === 'rights' && metric.type === 'cpr' && (
                      <FormattedMessage {...rootMessages.rights[child.key]} />
                    )}
                    {metricType === 'rights' && metric.type === 'esr' && (
                      <FormattedMessage
                        {...rootMessages.indicators[child.key]}
                      />
                    )}
                  </Anchor>
                </li>
              ))}
            </ul>
          </Box>
        </>
      )}
    </Box>
  );
}

MetricAside.propTypes = {
  metric: PropTypes.object,
  onSelectMetric: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // intl: intlShape.isRequired,
  ancestors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  metricInfo: (state, { metric }) => {
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
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

export default compose(withConnect)(MetricAside);
