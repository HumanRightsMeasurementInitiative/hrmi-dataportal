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
import ButtonToggleMainSetting from 'styled/ButtonToggleMainSetting';

import {
  getRouterRoute,
  getRouterMatch,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
  getTabSearch,
} from 'containers/App/selectors';

import {
  SCALES,
  STANDARDS,
  RIGHTS,
  DIMENSIONS,
  BENCHMARKS,
} from 'containers/App/constants';

import { setScale, setStandard, setBenchmark } from 'containers/App/actions';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';
import messages from './messages';
import Key from './Key';
import SettingsToggle from './SettingsToggle';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
`;

const SetScale = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  bottom: 100%;
  transform: translateY(20%);
`;

const showSettings = ({ route, match, tabIndex }) => {
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
  return true;
};
const showDimensionKey = ({ route }) => {
  if (route === 'metric') return false;
  return true;
};
const showHINote = ({ route, match }) => {
  const metricDetails = getMetricDetails(match);
  if (metricDetails && metricDetails.metricType === 'indicators') return false;
  if (route === 'country') return false;
  return true;
};

const showStandard = ({ match }) => {
  const metricDetails = getMetricDetails(match);
  if (metricDetails && metricDetails.metricType === 'indicators') return false;
  return true;
};
const showBenchmark = () => true;

const count = {
  r: RIGHTS.filter(r => typeof r.aggregate === 'undefined').length,
  d: DIMENSIONS.length,
};

export function Settings({
  route,
  match,
  scale,
  standard,
  benchmark,
  tabIndex,
  onSetScale,
  onSetStandard,
  onSetBenchmark,
  intl,
}) {
  if (!showSettings({ route, match, tabIndex })) return null;
  return (
    <Styled>
      <SetScale>
        {showScale({ route }) &&
          SCALES.map(s => (
            <ButtonToggleMainSetting
              active={s.key === scale}
              disabled={s.key === scale}
              onClick={() => {
                onSetScale(s.key);
              }}
              key={s.key}
            >
              {`${count[s.key]} ${intl.formatMessage(
                rootMessages.settings.scale[s.type],
              )}`}
            </ButtonToggleMainSetting>
          ))}
      </SetScale>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            direction="row"
            background="white"
            height="90px"
            width="full"
            pad={{ horizontal: size === 'xlarge' ? 'medium' : 'small' }}
            align="start"
            style={{
              boxShadow: '0px -3px 6px rgba(0, 0, 0, 0.15)',
            }}
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
              />
            )}
            {showHINote({ route, match }) && (
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
                    <FormattedMessage {...messages.hi.label} />
                  </Text>
                </Box>
                <Box>
                  <Text size="xsmall">
                    <FormattedMessage {...messages.hi.text} />
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
  scale: PropTypes.string,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  tabIndex: PropTypes.number,
  onSetScale: PropTypes.func,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  route: state => getRouterRoute(state),
  match: state => getRouterMatch(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  tabIndex: state => getTabSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetScale: value => dispatch(setScale(value)),
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Settings));
