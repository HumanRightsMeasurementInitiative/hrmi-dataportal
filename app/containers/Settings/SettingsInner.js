/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import styled from 'styled-components';
import { Box, Text } from 'grommet';

import { STANDARDS, BENCHMARKS } from 'containers/App/constants';

import getMetricDetails from 'utils/metric-details';
// import { isMinSize, isMaxSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';
import Key from './Key';
import SettingsToggle from './SettingsToggle';

const showDimensionKey = ({ route }) => {
  if (route === 'metric') return false;
  if (route === 'country') return false;
  return true;
};
const showHINote = ({ route, match }) => {
  const metricDetails = getMetricDetails(match);
  if (metricDetails && metricDetails.metricType === 'indicators') return false;
  if (route === 'country') return false;
  return true;
};
const showHIIndicatorNote = ({ match, metricInfo }) => {
  const metricDetails = getMetricDetails(match);
  if (
    metricDetails &&
    metricDetails.metricType === 'indicators' &&
    metricInfo &&
    metricInfo.standard === 'Core'
  ) {
    return true;
  }
  return false;
};
const showHICountryNote = ({ route, country, standard }) => {
  if (
    route === 'country' &&
    country.high_income_country === '1' &&
    standard !== 'hi'
  ) {
    return true;
  }
  return false;
};

const showAnyHINote = args =>
  showHINote(args) || showHIIndicatorNote(args) || showHICountryNote(args);

const showStandard = ({ match }) => {
  const metricDetails = getMetricDetails(match);
  if (metricDetails && metricDetails.metricType === 'indicators') return false;
  return true;
};
const showBenchmark = () => true;

export function SettingsInner({
  route,
  match,
  standard,
  benchmark,
  onSetStandard,
  onSetBenchmark,
  intl,
  metricInfo,
  country,
  size,
  fullSize,
}) {
  return (
    <>
      {showDimensionKey({ route, match }) && <Key fullSize={fullSize} />}
      {showBenchmark() && (
        <SettingsToggle
          setting="benchmark"
          active={benchmark}
          onActivate={onSetBenchmark}
          options={BENCHMARKS}
          square={{
            type: 'line',
            style: benchmark === 'best' ? 'solid' : 'dashed',
            color: 'light-2',
          }}
          horizontal={route === 'metric' || route === 'country'}
          fullSize={fullSize}
        />
      )}
      {showStandard({ route, match }) && (
        <SettingsToggle
          setting="standard"
          active={standard}
          onActivate={onSetStandard}
          options={STANDARDS}
          square={{
            type: 'square',
            style: standard === 'core' ? 'solid' : 'stripes',
            color: 'esr',
          }}
          horizontal={route === 'metric' || route === 'country'}
          fullSize={fullSize}
        />
      )}
      {showAnyHINote({
        route,
        match,
        metricInfo,
        country,
        standard,
      }) && (
        <Box
          pad={{
            top: 'small',
            left: size === 'xlarge' ? 'large' : 'medium',
          }}
          direction="column"
          style={{
            maxWidth: size === 'xlarge' ? '300px' : '240px',
          }}
        >
          <Box pad={{ bottom: 'xsmall' }}>
            <Text style={{ fontWeight: 600 }} size="small">
              {showHINote({ route, match }) && (
                <span>
                  {`(${intl.formatMessage(
                    rootMessages.labels.hiCountry,
                  )}): ${intl.formatMessage(messages.hi.title)}`}
                </span>
              )}
              {showHIIndicatorNote({ route, match, metricInfo }) && (
                <FormattedMessage {...messages.hi.title} />
              )}
              {showHICountryNote({ route, country, standard }) && (
                <FormattedMessage {...messages.hi.title} />
              )}
            </Text>
          </Box>
          <Box>
            <Text size="xsmall">
              {showHINote({ route, match }) && (
                <FormattedMessage {...messages.hi.text} />
              )}
              {showHIIndicatorNote({ route, match, metricInfo }) && (
                <FormattedMessage {...messages.hi.textIndicator} />
              )}
              {showHICountryNote({ route, country, standard }) && (
                <FormattedMessage {...messages.hi.text} />
              )}
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
}

SettingsInner.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  fullSize: PropTypes.bool,
  size: PropTypes.string,
  tabIndex: PropTypes.number,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  intl: intlShape.isRequired,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default injectIntl(SettingsInner);
