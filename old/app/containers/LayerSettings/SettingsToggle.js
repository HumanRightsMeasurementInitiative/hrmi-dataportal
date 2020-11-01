import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';

// import Tooltip from 'components/Tooltip';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';

import rootMessages from 'messages';

// const HEIGHT = 20;
// const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)

function SettingsToggle({
  name,
  options,
  onActivate,
  active,
  setting,
  msgValues,
}) {
  return (
    <Box direction="column" flex={{ shrink: 0 }} responsive={false}>
      <Box direction="row" align="center">
        <Box pad={{ vertical: 'small' }} direction="row">
          <Text size="large" style={{ fontWeight: 600 }}>
            {name || (
              <FormattedMessage
                {...rootMessages.settings[setting].name}
                values={msgValues}
              />
            )}
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
                values={msgValues}
              />
            </Text>
          </ButtonToggleSetting>
        ))}
      </Box>
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
  msgValues: PropTypes.object,
  name: PropTypes.string,
};

export default SettingsToggle;
