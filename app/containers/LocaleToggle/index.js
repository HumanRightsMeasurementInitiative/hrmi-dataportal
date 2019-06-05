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
import { DropButton, Box, ResponsiveContext } from 'grommet';
import { FormDown, FormUp, Checkmark } from 'grommet-icons';
import DropOption from 'styled/DropOption';

import { appLocales } from 'i18n';

import { getLocale } from 'containers/App/selectors';
import { LANGUAGES } from 'containers/App/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';

import messages from './messages';

const Styled = styled.span``;
// prettier-ignore
const StyledDropButton = styled(DropButton)`
  height: 44px;
  padding: 5px 10px;
  background-color: ${({ theme, active }) => active ? theme.global.colors['dark-3'] : 'transparent' };
  &:hover {
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:active {
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:visited {
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:focus {
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
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
      <ResponsiveContext.Consumer>
        {size => (
          <StyledDropButton
            plain
            reverse
            gap="xxsmall"
            active={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
            icon={open ? <FormUp /> : <FormDown />}
            label={
              size === 'small'
                ? `${LANGUAGES.short[locale]}`
                : `${intl.formatMessage(messages.language)}
              ${LANGUAGES.short[locale]}`
            }
            dropContent={
              <DropContent
                active={locale}
                options={appLocales}
                onSelect={onLocaleToggle}
              />
            }
          />
        )}
      </ResponsiveContext.Consumer>
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
