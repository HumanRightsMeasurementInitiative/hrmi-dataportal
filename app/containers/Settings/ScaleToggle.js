/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import ButtonToggleMainSetting from 'styled/ButtonToggleMainSetting';

import { getScaleSearch } from 'containers/App/selectors';

import { SCALES, RIGHTS, DIMENSIONS } from 'containers/App/constants';

import { setScale } from 'containers/App/actions';

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
  scale: PropTypes.string,
  onSetScale: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  scale: state => getScaleSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetScale: value => dispatch(setScale(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ScaleToggle));
