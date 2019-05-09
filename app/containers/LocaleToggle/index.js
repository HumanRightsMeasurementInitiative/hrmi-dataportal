/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { appLocales } from 'i18n';

import { getLocale } from 'containers/App/selectors';
import { LANGUAGES } from 'containers/App/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';

import Toggle from 'components/Toggle';

const Styled = styled.span`
  padding: 2px;
`;

export function LocaleToggle(props) {
  return (
    <Styled>
      <Toggle
        inverse
        value={props.locale}
        values={appLocales}
        formattedMessages={LANGUAGES.short}
        onToggle={props.onLocaleToggle}
      />
    </Styled>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
