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
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';

import { SCALES, STANDARDS, BENCHMARKS } from 'containers/App/constants';

import { setScale, setStandard, setBenchmark } from 'containers/App/actions';

import rootMessages from 'messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

export function Settings({
  path,
  scale,
  standard,
  benchmark,
  onSetScale,
  onSetStandard,
  onSetBenchmark,
}) {
  if (path === 'page') return null;
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
      </Box>
    </Styled>
  );
}

Settings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  scale: PropTypes.string,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  onSetScale: PropTypes.func,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  path: state => getRouterRoute(state),
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
