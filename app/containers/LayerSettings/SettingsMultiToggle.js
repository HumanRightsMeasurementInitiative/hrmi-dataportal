import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, ResponsiveContext } from 'grommet';

import ButtonToggleSetting from 'styled/ButtonToggleSetting';

// import { DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';

function SettingsMultiToggle({
  options,
  onChange,
  active,
  setting,
  inModal = false,
  defaultColor,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          pad={
            inModal
              ? { vertical: 'small' }
              : { left: size === 'xlarge' ? 'medium' : 'small' }
          }
          direction="column"
          flex={{ shrink: 0 }}
          responsive={false}
        >
          <Box direction="row" align="center">
            <Box pad={{ vertical: 'small' }} direction="row">
              <Text size="small" style={{ fontWeight: 600 }}>
                <FormattedMessage {...rootMessages.settings[setting].name} />
              </Text>
            </Box>
          </Box>
          <Box direction="row" align="center">
            {options.map(option => (
              <ButtonToggleSetting
                key={option.key}
                active={active.indexOf(option.key) > -1}
                color={option.color || defaultColor}
                onClick={() => {
                  // if current active and any other active
                  if (active.indexOf(option.key) > -1 && active.length > 0) {
                    // deactivate current
                    onChange(
                      active.reduce(
                        (memo, a) => (option.key === a ? memo : [...memo, a]),
                        [],
                      ),
                    );
                  }
                  // if current not active and any other active
                  if (active.indexOf(option.key) === -1 && active.length > 0) {
                    // activate current
                    onChange([...active, option.key]);
                  }
                }}
              >
                <Text size="small">
                  {setting !== 'groups' && (
                    <FormattedMessage
                      {...rootMessages.settings[setting][option.key]}
                    />
                  )}
                  {setting === 'groups' && (
                    <FormattedMessage {...rootMessages.groups[option.key]} />
                  )}
                </Text>
              </ButtonToggleSetting>
            ))}
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

SettingsMultiToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  setting: PropTypes.string.isRequired,
  active: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  tooltip: PropTypes.node,
  inModal: PropTypes.bool,
  defaultColor: PropTypes.string,
};

export default SettingsMultiToggle;
