/*
 *
 * LanguageToggle
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { DropButton, Box, ResponsiveContext } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';
import DropOption from 'styled/DropOption';

import { appLocales } from 'i18n';

import { getLocale } from 'containers/App/selectors';
import { LANGUAGES } from 'containers/App/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';

const Styled = styled.span`
  @media print {
    display: none;
  }
`;
// prettier-ignore
const StyledDropButton = styled(DropButton)`
  padding: 0 0 0 6px;
  color: ${({ theme }) => theme.global.colors.secondary};
  font-weight: 600;
  background: transparent;
  vertical-align: middle;
  &:hover {
    color: ${({ theme }) => theme.global.colors.dark};
  }
  &:active {
    color: ${({ theme }) => theme.global.colors.dark};
  }
  &:visited {
    color: ${({ theme }) => theme.global.colors.dark};
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors.dark};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-left: 10px;
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
          {LANGUAGES.long[option]}
        </DropOption>
      ))}
  </Box>
);

export function LocaleToggle({ locale, onLocaleToggle, light }) {
  const [open, setOpen] = useState(false);
  return (
    <Styled>
      <ResponsiveContext.Consumer>
        {() => (
          <StyledDropButton
            plain
            reverse
            light={light}
            gap="xxsmall"
            active={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
            icon={open ? <FormUp /> : <FormDown />}
            label={LANGUAGES.short[locale]}
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
  light: PropTypes.bool,
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
