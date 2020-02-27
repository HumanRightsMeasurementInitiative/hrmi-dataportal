/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import ButtonToggleMainSetting from 'styled/ButtonToggleMainSetting';

import { SCALES, RIGHTS, DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';

const Styled = styled.div``;
const count = {
  r: RIGHTS.filter(r => typeof r.aggregate === 'undefined').length,
  d: DIMENSIONS.length,
};
export function ScaleToggle({ scale, onSetScale, intl }) {
  return (
    <Styled>
      {SCALES.map(s => (
        <ButtonToggleMainSetting
          active={s.key === scale}
          disabled={s.key === scale}
          onClick={() => {
            onSetScale(s.key);
          }}
          key={s.key}
        >
          {`${count[s.key]} ${intl.formatMessage(
            rootMessages.settings.scale[s.type],
          )}`}
        </ButtonToggleMainSetting>
      ))}
    </Styled>
  );
}

ScaleToggle.propTypes = {
  // inModal: PropTypes.bool,
  scale: PropTypes.string,
  onSetScale: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(ScaleToggle);
