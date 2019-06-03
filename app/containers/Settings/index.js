/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import Icon from 'components/Icon';
import {
  getRouterRoute,
  getRouterMatch,
  getStandardSearch,
  getBenchmarkSearch,
  getTabSearch,
  getIndicatorInfo,
  getCountry,
} from 'containers/App/selectors';

import { STANDARDS, BENCHMARKS } from 'containers/App/constants';

import { setStandard, setBenchmark } from 'containers/App/actions';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';
import messages from './messages';
import Key from './Key';
import SettingsToggle from './SettingsToggle';
import ScaleToggle from './ScaleToggle';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.sizes.settings.height}px;
  background-color: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
`;

const SettingsIconWrapInner = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const SettingsIconWrap = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 120px;
  text-align: center;
  display: table;
  height: 100%;
  background-color: ${({ theme }) => theme.global.colors['light-1']};
`;

const SetScaleWrap = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  bottom: 100%;
  transform: translateY(20%);
  z-index: 1;
`;

export const showSettings = ({ route, match, tabIndex }) => {
  if (route === 'page') return false;
  if (route === 'metric') {
    const metricDetails = getMetricDetails(match);
    if (metricDetails && metricDetails.type === 'cpr') return false;
  }
  if (route === 'country') {
    return tabIndex === 0;
  }
  return true;
};

const showScale = ({ route }) => {
  if (route === 'metric') return false;
  if (route === 'country') return false;
  return true;
};
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

export function Settings({
  route,
  match,
  standard,
  benchmark,
  tabIndex,
  onSetStandard,
  onSetBenchmark,
  intl,
  metricInfo,
  country,
}) {
  if (!showSettings({ route, match, tabIndex })) return null;
  return (
    <Styled>
      {showScale({ route }) && (
        <SetScaleWrap>
          <ScaleToggle />
        </SetScaleWrap>
      )}
      <SettingsIconWrap>
        <SettingsIconWrapInner>
          <Icon name="SETTINGS" />
        </SettingsIconWrapInner>
      </SettingsIconWrap>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            direction="row"
            height="90px"
            width="full"
            pad={{ left: size === 'xlarge' ? 'medium' : 'small' }}
            align="start"
            style={{ position: 'relative' }}
          >
            {showDimensionKey({ route, match }) && <Key />}
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
              />
            )}
            {showAnyHINote({ route, match, metricInfo, country, standard }) && (
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
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Styled>
  );
}

Settings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  tabIndex: PropTypes.number,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  intl: intlShape.isRequired,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  route: state => getRouterRoute(state),
  match: state => getRouterMatch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  tabIndex: state => getTabSearch(state),
  metricInfo: state => {
    const route = getRouterRoute(state);
    if (route === 'metric') {
      const match = getRouterMatch(state);
      const metric = getMetricDetails(match);
      if (metric.metricType === 'indicators') {
        return getIndicatorInfo(state, metric.code);
      }
      return false;
    }
    return false;
  },
  country: state => {
    const route = getRouterRoute(state);
    if (route === 'country') {
      const match = getRouterMatch(state);
      return getCountry(state, match);
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Settings));
