import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';

import { selectCountry } from 'containers/App/actions';
import { getCountries } from 'containers/App/selectors';

import { prepCountries } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

import messages from './messages';

export function NavCountry({
  countries,
  onSelectCountry,
  intl,
  onClose,
  size,
}) {
  const [search, setSearch] = useState('');

  const sorted = countries && prepCountries(countries, search, intl);

  return (
    <NavWrapper>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(messages.search.countrySearch)}
        size={size}
      />
      <NavScroll>
        <Box flex overflow="auto" pad="medium">
          {(!sorted || sorted.length === 0) && (
            <FormattedMessage {...messages.search.noResults} />
          )}
          {sorted && sorted.length > 0 && (
            <NavOptionGroup
              options={sorted}
              onClick={key => {
                onClose();
                onSelectCountry(key);
              }}
            />
          )}
        </Box>
      </NavScroll>
    </NavWrapper>
  );
}

NavCountry.propTypes = {
  onSelectCountry: PropTypes.func,
  onClose: PropTypes.func,
  // currentCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
  size: PropTypes.string,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: country => dispatch(selectCountry(country)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(NavCountry));
