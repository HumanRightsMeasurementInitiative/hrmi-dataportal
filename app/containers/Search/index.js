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

import { withTheme } from 'styled-components';
import { Box, Button, Drop, Text } from 'grommet';
import { Close, Search as SearchIcon } from 'grommet-icons';
import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  AT_RISK_GROUPS,
} from 'containers/App/constants';
import { getCountries } from 'containers/App/selectors';
import { navigate, trackEvent } from 'containers/App/actions';
// import { isMinSize, isMaxSize } from 'utils/responsive';

import messages from './messages';
import SearchResults from './SearchResults';
import TextInput from './TextInput';
import { prepMetrics, prepCountries, prepGroups } from './search';

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
  focus,
  countries,
  bordersize,
  bordercolor,
}) {
  const hasToggle = typeof onToggle !== 'undefined';
  const [search, setSearch] = useState('');
  const [activeResult, setActiveResult] = useState(0);
  const searchRef = useRef(null);
  const textInputRef = useRef(null);
  const dropRef = useRef(null);

  const outsideSearchClick = e => {
    // console.log(searchRef.current && searchRef.current.contains(e.target))
    // console.log(dropRef.current && dropRef.current.contains(e.target))
    // inside search click
    if (searchRef.current && searchRef.current.contains(e.target)) {
      return;
    }
    // inside drop click
    if (dropRef.current && dropRef.current.contains(e.target)) {
      return;
    }
    // outside click
    if (hasToggle) {
      onToggle(false);
    }
  };

  useEffect(() => {
    if ((focus || expand) && textInputRef) {
      textInputRef.current.focus();
    }
  }, [searched, focus, expand]);

  useEffect(() => {
    if (hasToggle) {
      document.addEventListener('mousedown', outsideSearchClick);
      return () => {
        document.removeEventListener('mousedown', outsideSearchClick);
      };
    }
    return () => {};
  }, [expand]);

  let sortedCountries = [];
  let dimensions = [];
  let rights = [];
  let indicators = [];
  let groups = [];
  if (drop && search.length > 0) {
    sortedCountries = countries ? prepCountries(countries, search, intl) : [];
    dimensions = prepMetrics(DIMENSIONS, 'dimensions', search, intl);
    rights = prepMetrics(RIGHTS, 'rights', search, intl);
    indicators = prepMetrics(INDICATORS, 'indicators', search, intl);
    groups = prepGroups(AT_RISK_GROUPS, search, intl);
  }

  return (
    <Box
      margin={margin ? { horizontal: 'medium' } : null}
      style={{ minWidth: expand ? '500px' : 0 }}
    >
      <Box
        border={{
          color: expand ? 'dark' : bordercolor,
          size: expand ? 'small' : bordersize,
        }}
        direction="row"
        align="center"
        round="xlarge"
        ref={searchRef}
        style={stretch ? null : { maxWidth: '500px' }}
        height={`${theme.sizes.search[size]}px`}
        pad={{ horizontal: 'ms' }}
        margin={{ left: hasToggle ? 'ms' : '0' }}
        background="white"
      >
        {hasToggle && !expand && (
          <Button
            plain
            onClick={() => {
              onToggle(true);
              setActiveResult(0);
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
        {((hasToggle && expand) || !hasToggle) && (
          <>
            <TextInput
              plain
              value={search}
              onChange={evt => {
                if (evt && evt.target) {
                  searched(evt.target.value);
                  setSearch(evt.target.value);
                  if (onSearch) onSearch(evt.target.value);
                  setActiveResult(0);
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
            {!hasToggle && search.length === 0 && (
              <Box pad={{ right: 'xsmall' }}>
                <SearchIcon size={size} color="dark" />
              </Box>
            )}
            {(hasToggle || search.length > 0) && (
              <Button
                plain
                fill="vertical"
                onClick={() => {
                  setSearch('');
                  if (onSearch) onSearch('');
                  if (hasToggle) onToggle(false);
                  setActiveResult(0);
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
      {((hasToggle && expand) || !hasToggle) && drop && search.length > 1 && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={searchRef.current}
          onClickOutside={() => {
            setSearch('');
            if (onSearch) onSearch('');
            setActiveResult(0);
          }}
          ref={dropRef}
        >
          <SearchResults
            onClose={() => {
              setSearch('');
              if (onSearch) onSearch('');
              setActiveResult(0);
            }}
            search={search}
            onSelect={() => hasToggle && onToggle(false)}
            activeResult={activeResult}
            setActiveResult={setActiveResult}
            countries={sortedCountries}
            dimensions={dimensions}
            rights={rights}
            indicators={indicators}
            groups={groups}
            maxResult={
              sortedCountries.length +
              groups.length +
              rights.length +
              indicators.length +
              dimensions.length
            }
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
  focus: PropTypes.bool,
  drop: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object,
  placeholder: PropTypes.string,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  bordersize: PropTypes.string,
  bordercolor: PropTypes.string,
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
const mapStateToProps = state => ({
  countries: getCountries(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(Search)));
