/*
 *
 * LanguageToggle
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { DropButton, Box } from 'grommet';
import { FormDown, FormUp, Checkmark } from 'grommet-icons';
import DropOption from 'styled/DropOption';

import { appLocales } from 'i18n';

import { getLocale } from 'containers/App/selectors';
import { LANGUAGES } from 'containers/App/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';

import messages from './messages';

const Styled = styled.span`
  padding: 0 5px;
`;

const DropContent = ({ active, options, onSelect }) => (
  <Box pad="none">
    {options &&
      options.map(option => (
        <DropOption
          key={option}
          onClick={() => onSelect(option)}
          active={active === option}
          disabled={active === option}
        >
          <Box align="center" direction="row">
            {LANGUAGES.long[option]}
            {active === option && (
              <Box margin={{ left: 'auto' }}>
                <Checkmark color="dark-4" />
              </Box>
            )}
          </Box>
        </DropOption>
      ))}
  </Box>
);

export function LocaleToggle({ intl, locale, onLocaleToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <Styled>
      <DropButton
        plain
        reverse
        gap="xxsmall"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        icon={open ? <FormUp /> : <FormDown />}
        label={`${intl.formatMessage(messages.language)}
          ${LANGUAGES.short[locale]}`}
        dropContent={
          <DropContent
            active={locale}
            options={appLocales}
            onSelect={onLocaleToggle}
          />
        }
      />
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
  intl: intlShape.isRequired,
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
)(injectIntl(LocaleToggle));
