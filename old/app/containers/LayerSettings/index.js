/**
 *
 * LayerSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Heading, Paragraph } from 'grommet';

import {
  getStandardSearch,
  getBenchmarkSearch,
  getScaleSearch,
} from 'containers/App/selectors';
import { setStandard, setBenchmark, setScale } from 'containers/App/actions';
import {
  STANDARDS,
  BENCHMARKS,
  SCALES,
  DIMENSIONS,
  RIGHTS,
} from 'containers/App/constants';

import messages from './messages';

import SettingsToggle from './SettingsToggle';
import InfoBenchmark from './InfoBenchmark';
import InfoStandard from './InfoStandard';
// import InfoScale from './InfoScale';

const SettingWrap = styled.div`
  margin-bottom: 30px;
`;

export function LayerSettings ({
  scale,
  standard,
  benchmark,
  onSetStandard,
  onSetBenchmark,
  onSetScale,
  layer,
  intl,
}) {
  const { showScale, showBenchmark, showStandard, chartName } = layer;

  return (
    <Box
      direction='column'
      pad={{ left: 'medium', bottom: 'medium', top: 'small' }}
    >
      <Heading level={2}>
        {chartName && (
          <FormattedMessage
            {...messages.labelWithName}
            values={{ name: chartName }}
          />
        )}
        {!chartName && <FormattedMessage {...messages.label} />}
      </Heading>
      <Paragraph>
        <FormattedMessage {...messages.intro} />
      </Paragraph>
      {showScale && (
        <SettingWrap>
          <SettingsToggle
            setting='scale'
            active={scale}
            onActivate={onSetScale}
            options={SCALES.map(s => ({
              label: s.type,
              ...s,
            }))}
            horizontal
            msgValues={{
              noDimensions: DIMENSIONS.length,
              noRights: RIGHTS.length,
            }}
          />
        </SettingWrap>
      )}
      {showBenchmark && (
        <SettingWrap>
          <SettingsToggle
            setting='benchmark'
            active={benchmark}
            onActivate={onSetBenchmark}
            options={BENCHMARKS}
            horizontal
            name={intl.formatMessage(messages.labelBenchmark)}
          />
          <InfoBenchmark size='xsmall' hasKey />
        </SettingWrap>
      )}
      {showStandard && (
        <SettingWrap>
          <SettingsToggle
            setting='standard'
            active={standard}
            onActivate={onSetStandard}
            options={STANDARDS}
            horizontal
            name={intl.formatMessage(messages.labelStandard)}
          />
          <InfoStandard size='xsmall' hasKey />
        </SettingWrap>
      )}
    </Box>
  );
}

LayerSettings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  standard: PropTypes.string,
  onSetStandard: PropTypes.func,
  benchmark: PropTypes.string,
  onSetBenchmark: PropTypes.func,
  scale: PropTypes.string,
  onSetScale: PropTypes.func,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scale: state => getScaleSearch(state),
});

export function mapDispatchToProps (dispatch) {
  return {
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
    onSetScale: value => dispatch(setScale(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(LayerSettings));
