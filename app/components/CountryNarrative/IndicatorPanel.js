import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Heading, Text, Box } from 'grommet';

import rootMessages from 'messages';

function IndicatorPanel({ indicator, column }) {
  return (
    <Box pad="small">
      <Heading level={6} margin={{ vertical: '2px' }}>
        <FormattedMessage {...rootMessages.indicators[indicator.key]} />
      </Heading>
      <Text>{`${indicator.value && indicator.value[column]}`}</Text>
    </Box>
  );
}
IndicatorPanel.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  column: PropTypes.string,
};

export default IndicatorPanel;
