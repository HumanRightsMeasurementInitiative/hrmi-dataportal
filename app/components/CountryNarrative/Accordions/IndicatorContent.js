import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import Hint from 'styled/Hint';
import ButtonToggleValueSetting from 'styled/ButtonToggleValueSetting';

import rootMessages from 'messages';

import PanelSimple from './PanelSimple';
import IndicatorMain from './IndicatorMain';
import IndicatorTop from './IndicatorTop';

const Settings = styled(Box)`
  background: ${({ theme }) => theme.global.colors['light-1']};
`;

function IndicatorContent({ benchmark, onMetricClick, standard, indicators }) {
  const [raw, setRaw] = useState(false);
  return (
    <div>
      <Settings direction="row" justify="end" pad="small" border="top">
        {raw && (
          <Box justify="start" fill="horizontal" alignSelf="center">
            <Hint>
              <Text size="small">
                <FormattedMessage {...rootMessages.settings.value.note} />
              </Text>
            </Hint>
          </Box>
        )}
        <Box direction="row" justify="end">
          <ButtonToggleValueSetting
            active={!raw}
            disabled={!raw}
            onClick={() => {
              setRaw(false);
            }}
          >
            <FormattedMessage {...rootMessages.settings.value.score} />
          </ButtonToggleValueSetting>
          <ButtonToggleValueSetting
            active={raw}
            disabled={raw}
            onClick={() => {
              setRaw(true);
            }}
          >
            <FormattedMessage {...rootMessages.settings.value.raw} />
          </ButtonToggleValueSetting>
        </Box>
      </Settings>
      {indicators.map(indicator => (
        <PanelSimple
          level={3}
          key={indicator.key}
          top={
            <IndicatorTop
              indicator={indicator}
              benchmark={benchmark}
              onMetricClick={onMetricClick}
              standard={standard}
              raw={raw}
            />
          }
          main={
            <IndicatorMain
              indicator={indicator}
              benchmark={benchmark}
              onMetricClick={onMetricClick}
              standard={standard}
              raw={raw}
            />
          }
        />
      ))}
    </div>
  );
}

IndicatorContent.propTypes = {
  onMetricClick: PropTypes.func,
  standard: PropTypes.string,
  indicators: PropTypes.array,
  benchmark: PropTypes.object,
};

export default IndicatorContent;
