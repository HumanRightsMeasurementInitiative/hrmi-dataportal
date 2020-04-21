/**
 *
 * Search
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';

import styled, { withTheme } from 'styled-components';
import { Box, Button, Drop, TextInput, Text } from 'grommet';
import { Close, Search as SearchIcon } from 'grommet-icons';

import { navigate, trackEvent } from 'containers/App/actions';
// import { isMinSize, isMaxSize } from 'utils/responsive';

import messages from './messages';
import SearchResults from './SearchResults';

const StyledTextInput = styled(TextInput)`
  font-weight: 600;
  &::placeholder {
    color: ${({ theme }) => theme.global.colors.dark};
    font-weight: 400;
    opacity: 0.8;
  }
`;

export function Search({
  intl,
  searched,
  margin,
  stretch,
  expand,
  size = 'medium',
  onToggle,
  theme,
  placeholder,
  example,
  drop = true,
  onSearch,
}) {
  useEffect(() => {
    if (expand && textInputRef) {
      textInputRef.current.focus();
    }
  });

  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const textInputRef = useRef(null);

  return (
    <Box
      margin={margin ? { horizontal: 'medium' } : null}
      style={{ minWidth: expand ? '500px' : 0 }}
    >
      <Box
        border={{
          color: 'dark',
          size: 'small',
        }}
        direction="row"
        align="center"
        round="xlarge"
        ref={searchRef}
        style={stretch ? null : { maxWidth: '500px' }}
        height={`${theme.sizes.search[size]}px`}
        pad={{ horizontal: 'ms' }}
        margin={{ left: onToggle ? 'ms' : '0' }}
        background="white"
      >
        {onToggle && !expand && (
          <Button
            plain
            onClick={() => {
              onToggle();
            }}
            label={
              <Text weight={600}>{intl.formatMessage(messages.search)}</Text>
            }
            reverse
            icon={<SearchIcon size={size} color="dark" />}
            style={{ textAlign: 'center' }}
            gap="xsmall"
          />
        )}
        {((onToggle && expand) || !onToggle) && (
          <>
            <StyledTextInput
              plain
              value={search}
              onChange={evt => {
                if (evt && evt.target) {
                  searched(evt.target.value);
                  setSearch(evt.target.value);
                  if (onSearch) onSearch(evt.target.value);
                }
              }}
              placeholder={
                placeholder ||
                intl.formatMessage(
                  example ? messages.exampleSearch : messages.allSearch,
                )
              }
              ref={textInputRef}
            />
            {!onToggle && search.length <= 1 && (
              <Box pad={{ right: 'xsmall' }}>
                <SearchIcon size={size} color="dark" />
              </Box>
            )}
            {(onToggle || search.length > 1) && (
              <Button
                plain
                fill="vertical"
                onClick={() => {
                  setSearch('');
                  if (onSearch) onSearch('');
                  if (onToggle) onToggle();
                }}
                icon={<Close size={size} color="dark" />}
                style={{
                  textAlign: 'center',
                  height: `${theme.sizes.search[size]}px`,
                }}
              />
            )}
          </>
        )}
      </Box>
      {drop && search.length > 1 && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={searchRef.current}
          onClickOutside={() => {
            setSearch('');
            if (onSearch) onSearch('');
          }}
        >
          <SearchResults
            onClose={() => {
              setSearch('');
              if (onSearch) onSearch('');
            }}
            search={search}
            onSelect={() => onToggle && onToggle()}
          />
        </Drop>
      )}
    </Box>
  );
}

Search.propTypes = {
  searched: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
  intl: intlShape.isRequired,
  margin: PropTypes.bool,
  stretch: PropTypes.bool,
  expand: PropTypes.bool,
  example: PropTypes.bool,
  drop: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object,
  placeholder: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  searched: value => {
    dispatch(
      trackEvent({
        category: 'Search',
        action: value,
      }),
    );
  },
  // navigate to location
  nav: location => {
    dispatch(
      navigate(location, {
        keepTab: true,
        trackEvent: {
          category: 'Content',
          action: 'Search: navigate',
          value: typeof location === 'object' ? location.pathname : location,
        },
      }),
    );
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(Search)));
