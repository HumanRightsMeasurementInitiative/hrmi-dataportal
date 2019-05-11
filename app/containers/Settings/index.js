/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Button, Box, Text } from 'grommet';
import { Performance } from 'grommet-icons';

import {
  getRouterRoute,
  getRouterMatch,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';

import { SCALES, STANDARDS, BENCHMARKS } from 'containers/App/constants';

import { setScale, setStandard, setBenchmark } from 'containers/App/actions';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

const showSettings = ({ route, match }) => {
  if (route === 'page') return false;
  if (route === 'metric') {
    const metricDetails = getMetricDetails(match);
    if (metricDetails && metricDetails.type === 'cpr') return false;
  }
  return true;
};

const showScale = ({ route }) => {
  if (route === 'metric') return false;
  return true;
};
const showStandard = ({ match }) => {
  const metricDetails = getMetricDetails(match);
  if (metricDetails && metricDetails.metricType === 'indicators') return false;
  return true;
};
const showBenchmark = () => true;

export function Settings({
  route,
  match,
  scale,
  standard,
  benchmark,
  onSetScale,
  onSetStandard,
  onSetBenchmark,
}) {
  if (!showSettings({ route, match })) return null;
  return (
    <Styled>
      <Box
        elevation="medium"
        direction="row"
        background="white"
        height="100px"
        width="full"
        pad="medium"
        align="center"
      >
        <Performance />
        {showScale({ route }) && (
          <Box pad="medium" direction="row" align="center">
            <Text size="small">
              <FormattedMessage {...rootMessages.settings.scale.name} />
            </Text>
            <Box direction="row">
              {SCALES.map(s => (
                <Box key={s.key} align="center" direction="row">
                  <Button
                    hoverIndicator="light-1"
                    active={s.key === scale}
                    onClick={() => {
                      onSetScale(s.key);
                    }}
                  >
                    <Box pad="small" direction="row" align="center" gap="small">
                      <Text>
                        <FormattedMessage
                          {...rootMessages.settings.scale[s.type]}
                        />
                      </Text>
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {showStandard({ route, match }) && (
          <Box pad="medium" direction="row" align="center">
            <Text size="small">
              <FormattedMessage {...rootMessages.settings.standard.name} />
            </Text>
            <Box direction="row">
              {STANDARDS.map(s => (
                <Box key={s.key} align="center" direction="row">
                  <Button
                    hoverIndicator="light-1"
                    active={s.key === standard}
                    onClick={() => {
                      onSetStandard(s.key);
                    }}
                  >
                    <Box pad="small" direction="row" align="center" gap="small">
                      <Text>
                        <FormattedMessage
                          {...rootMessages.settings.standard[s.key]}
                        />
                      </Text>
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {showBenchmark() && (
          <Box pad="medium" direction="row" align="center">
            <Text size="small">
              <FormattedMessage {...rootMessages.settings.benchmark.name} />
            </Text>
            <Box direction="row">
              {BENCHMARKS.map(s => (
                <Box key={s.key} align="center" direction="row">
                  <Button
                    hoverIndicator="light-1"
                    active={s.key === benchmark}
                    onClick={() => {
                      onSetBenchmark(s.key);
                    }}
                  >
                    <Box pad="small" direction="row" align="center" gap="small">
                      <Text>
                        <FormattedMessage
                          {...rootMessages.settings.benchmark[s.key]}
                        />
                      </Text>
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
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
  onSetScale: PropTypes.func,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  route: state => getRouterRoute(state),
  match: state => getRouterMatch(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
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

export default compose(withConnect)(Settings);
