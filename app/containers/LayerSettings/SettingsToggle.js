import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';

// import Tooltip from 'components/Tooltip';
import BenchmarkOverlay from 'components/Tooltip/BenchmarkOverlay';
import StandardOverlay from 'components/Tooltip/StandardOverlay';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';

import rootMessages from 'messages';

// const HEIGHT = 20;
// const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)

function SettingsToggle({ options, onActivate, active, setting }) {
  return (
    <Box
      direction="column"
      flex={{ shrink: 0 }}
      responsive={false}
      margin={{ bottom: 'large' }}
    >
      <Box direction="row" align="center">
        <Box pad={{ vertical: 'small' }} direction="row">
          <Text size="large" style={{ fontWeight: 600 }}>
            <FormattedMessage {...rootMessages.settings[setting].name} />
          </Text>
        </Box>
      </Box>
      <Box direction="row" align="center" margin={{ bottom: 'small' }}>
        {options.map(option => (
          <ButtonToggleSetting
            key={option.key}
            active={option.key === active}
            disabled={option.key === active}
            onClick={() => {
              onActivate(option.key);
            }}
          >
            <Text size="small">
              <FormattedMessage
                {...rootMessages.settings[setting][option.label || option.key]}
              />
            </Text>
          </ButtonToggleSetting>
        ))}
      </Box>
      {setting === 'standard' && <StandardOverlay size="xsmall" hasKey />}
      {setting === 'benchmark' && <BenchmarkOverlay size="xsmall" hasKey />}
    </Box>
  );
}

SettingsToggle.propTypes = {
  onActivate: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  tooltip: PropTypes.node,
  horizontal: PropTypes.bool,
};

export default SettingsToggle;
