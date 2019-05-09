/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';

import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';
import { selectMetric } from 'containers/App/actions';

import rootMessages from 'messages';

const Option = styled(Button)``;

export function MetricDropdown({ onSelectMetric, onClose }) {
  return (
    <Box pad="small">
      <Text color="dark-3" size="small">
        <FormattedMessage {...rootMessages['metric-types'].dimensions} />
      </Text>
      {DIMENSIONS.map(metric => (
        <Option
          plain
          key={metric.key}
          onClick={() => {
            onClose();
            onSelectMetric(metric.key);
          }}
        >
          <FormattedMessage {...rootMessages.dimensions[metric.key]} />
        </Option>
      ))}
      <hr />
      <Text color="dark-3" size="small">
        <FormattedMessage {...rootMessages['metric-types'].rights} />
      </Text>
      {RIGHTS.map(metric => (
        <Option
          plain
          key={metric.key}
          onClick={() => {
            onClose();
            onSelectMetric(metric.key);
          }}
        >
          <FormattedMessage {...rootMessages.rights[metric.key]} />
        </Option>
      ))}
      <hr />
      <Text color="dark-3" size="small">
        <FormattedMessage {...rootMessages['metric-types'].indicators} />
      </Text>
      {INDICATORS.map(metric => (
        <Option
          plain
          key={metric.key}
          onClick={() => {
            onClose();
            onSelectMetric(metric.key);
          }}
        >
          <FormattedMessage {...rootMessages.indicators[metric.key]} />
        </Option>
      ))}
    </Box>
  );
}

MetricDropdown.propTypes = {
  onSelectMetric: PropTypes.func,
  onClose: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(MetricDropdown);
