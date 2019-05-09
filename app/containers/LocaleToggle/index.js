/*
 *
 * LanguageToggle
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, DropButton, Text, Box } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import { appLocales } from 'i18n';

import { getLocale } from 'containers/App/selectors';
import { LANGUAGES } from 'containers/App/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';

const Styled = styled.span`
  padding: 0 5px;
`;

const Option = styled(Button)``;

const DropContent = ({ active, options, onSelect }) => (
  <Box pad="small">
    {options &&
      options.map(option => (
        <Option
          plain
          color={active === option ? 'dark-4' : 'dark-1'}
          onClick={() => onSelect(option)}
        >
          {LANGUAGES.long[option]}
        </Option>
      ))}
  </Box>
);

export function LocaleToggle(props) {
  const [open, setOpen] = useState(false);
  return (
    <Styled>
      <DropButton
        plain
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        dropContent={
          <DropContent
            active={props.locale}
            options={appLocales}
            onSelect={props.onLocaleToggle}
          />
        }
      >
        <Text>{LANGUAGES.short[props.locale]}</Text>
        {!open && <FormDown />}
        {open && <FormUp />}
      </DropButton>
    </Styled>
  );
}

// <Toggle
//   inverse
//   value={props.locale}
//   values={appLocales}
//   formattedMessages={LANGUAGES.short}
//   onToggle={props.onLocaleToggle}
// />

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

DropContent.propTypes = {
  onSelect: PropTypes.func,
  active: PropTypes.string,
  options: PropTypes.array,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: locale => dispatch(changeLocale(locale)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
