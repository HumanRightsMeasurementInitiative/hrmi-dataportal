/**
 *
 * Settings
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext, Button, Layer, Text, Heading } from 'grommet';
import Icon from 'components/Icon';
import Close from 'containers/Close';
import {
  getRouterRoute,
  getRouterMatch,
  getStandardSearch,
  getBenchmarkSearch,
  getTabSearch,
  getIndicatorInfo,
  getCountry,
} from 'containers/App/selectors';

import { setStandard, setBenchmark } from 'containers/App/actions';
import { PATHS } from 'containers/App/constants';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';

import messages from './messages';

import ScaleToggle from './ScaleToggle';
import SettingsInner from './SettingsInner';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.sizes.settings.heightCollapsed}px;
  background-color: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
  z-index: 5;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    height: ${({ theme }) => theme.sizes.settings.height}px;
  }
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
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.global.colors['light-1']};
  display: none;
  @media (min-width: 1024px) {
    display: table;
    width: 60px;
  }
  @media (min-width: 1228px) {
    width: 120px;
    left: auto;
  }
`;

const SetScaleWrap = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 130%;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    text-align: left;
    left: ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    transform: translateY(20%);
    bottom: 100%;
  }
  z-index: 1;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.global.colors['light-1']};
  width: 100%;
  height: ${({ theme }) => theme.sizes.settings.heightCollapsed}px;
  text-align: center;
`;

export const showSettings = ({ route, match, tabIndex }) => {
  if (route === PATHS.PAGE) return false;
  if (route === PATHS.METRIC) {
    const metricDetails = getMetricDetails(match);
    if (metricDetails && metricDetails.type === 'cpr') return false;
    return true;
  }
  if (route === PATHS.COUNTRY) {
    return tabIndex === 0;
  }
  return route === PATHS.COUNTRIES || route === PATHS.METRICS;
};

const showScale = ({ route }) => {
  if (route === 'metric') return false;
  if (route === 'country') return false;
  return true;
};

export function Settings({
  route,
  match,
  standard,
  benchmark,
  tabIndex,
  onSetStandard,
  onSetBenchmark,
  metricInfo,
  country,
}) {
  const [open, setOpen] = useState(false);
  if (!showSettings({ route, match, tabIndex })) return null;
  return (
    <Styled>
      {showScale({ route }) && (
        <SetScaleWrap>
          <ScaleToggle />
        </SetScaleWrap>
      )}
      <ResponsiveContext.Consumer>
        {size => (
          <>
            {isMaxSize(size, 'medium') && (
              <StyledButton onClick={() => setOpen(true)}>
                <Icon name="SETTINGS" />
                <Text
                  margin={{ horizontal: 'small' }}
                  style={{ verticalAlign: 'middle' }}
                >
                  <FormattedMessage {...messages.mobile.open} />
                </Text>
              </StyledButton>
            )}
            {isMinSize(size, 'large') && (
              <SettingsIconWrap>
                <SettingsIconWrapInner>
                  <Icon name="SETTINGS" />
                </SettingsIconWrapInner>
              </SettingsIconWrap>
            )}
            {isMinSize(size, 'large') && (
              <Box
                direction="row"
                height="90px"
                width="full"
                pad={{
                  left: isMinSize(size, 'xlarge') ? 'medium' : 'xsmall',
                  top: 'xsmall',
                }}
                align="start"
                style={{ position: 'relative' }}
              >
                <SettingsInner
                  route={route}
                  match={match}
                  benchmark={benchmark}
                  onSetBenchmark={onSetBenchmark}
                  standard={standard}
                  onSetStandard={onSetStandard}
                  metricInfo={metricInfo}
                  country={country}
                  size={size}
                />
              </Box>
            )}
            {isMaxSize(size, 'medium') && open && (
              <Layer full animate={false}>
                <Box fill>
                  <Box
                    direction="row"
                    as="header"
                    elevation="small"
                    justify="between"
                    align="center"
                    pad={{ horizontal: 'large', vertical: 'small' }}
                  >
                    <Heading responsive={false} level={4} margin="none">
                      <FormattedMessage {...messages.mobile.title} />
                    </Heading>
                    <Box>
                      <Close
                        onClick={() => setOpen(false)}
                        float={false}
                        text={false}
                        plain
                      />
                    </Box>
                  </Box>
                  <Box pad="large" flex overflow="auto">
                    <SettingsInner
                      route={route}
                      match={match}
                      benchmark={benchmark}
                      onSetBenchmark={onSetBenchmark}
                      standard={standard}
                      onSetStandard={onSetStandard}
                      metricInfo={metricInfo}
                      country={country}
                      size={size}
                      inModal
                    />
                  </Box>
                  <Box
                    as="footer"
                    justify="end"
                    direction="row"
                    align="center"
                    elevation="small"
                  >
                    <StyledButton onClick={() => setOpen(false)}>
                      <Icon name="SETTINGS" />
                      <Text
                        margin={{ horizontal: 'small' }}
                        style={{ verticalAlign: 'middle' }}
                      >
                        <FormattedMessage {...messages.mobile.close} />
                      </Text>
                    </StyledButton>
                  </Box>
                </Box>
              </Layer>
            )}
          </>
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

export default compose(withConnect)(Settings);
