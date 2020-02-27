/**
 *
 * Search
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';

import styled from 'styled-components';
import { Box, Button, Drop, TextInput } from 'grommet';
import { FormClose, Search as SearchIcon } from 'grommet-icons';

import { navigate, trackEvent } from 'containers/App/actions';
// import { isMinSize, isMaxSize } from 'utils/responsive';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import messages from './messages';
import SearchResults from './SearchResults';

const StyledTextInput = styled(TextInput)`
  &::placeholder {
    color: ${({ dark }) => (dark ? 'white' : 'black')};
  }
`;

export function Search({
  intl,
  searched,
  margin,
  dark = false,
  stretch = false,
}) {
  useInjectSaga({ key: 'app', saga });

  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  return (
    <Box
      margin={margin ? { horizontal: 'medium' } : null}
      width={stretch ? '100%' : null}
      style={{ minWidth: '300px' }}
    >
      <Box
        background={dark ? 'dark' : 'white'}
        direction="row"
        align="center"
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        round="small"
        ref={searchRef}
        style={stretch ? null : { maxWidth: '500px' }}
      >
        <StyledTextInput
          plain
          value={search}
          onChange={evt => {
            if (evt && evt.target) {
              searched(evt.target.value);
              setSearch(evt.target.value);
            }
          }}
          placeholder={intl.formatMessage(messages.allSearch)}
          pad="xsmall"
          dark={dark}
        />
        {search && search.length > 0 && (
          <Button onClick={() => setSearch('')} pad="xsmall">
            <FormClose />
          </Button>
        )}
        {(!search || search.length === 0) && <SearchIcon />}
      </Box>
      {search.length > 1 && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={searchRef.current}
          onClickOutside={() => setSearch('')}
        >
          <SearchResults onClose={() => setSearch('')} search={search} />
        </Drop>
      )}
    </Box>
  );
}

Search.propTypes = {
  searched: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  margin: PropTypes.bool,
  dark: PropTypes.bool,
  stretch: PropTypes.bool,
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

export default compose(withConnect)(injectIntl(Search));
