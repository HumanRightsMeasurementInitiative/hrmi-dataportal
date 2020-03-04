import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';

import { SIZES } from 'theme';
import { PATHS } from 'containers/App/constants';
import { selectCountry, navigate } from 'containers/App/actions';
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
  nav,
  subject,
}) {
  const [search, setSearch] = useState('');

  const sorted = countries && prepCountries(countries, search, intl);
  // figure out available height for IE11
  const h = window.innerHeight - SIZES.header.height;
  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(messages.countrySearch)}
        size={size}
        subject={subject}
      />
      <NavScroll>
        <Box flex overflow="auto" pad="medium">
          {search === '' && (
            <NavOptionGroup
              label="All countries"
              subject={subject}
              options={[
                {
                  key: 'countries',
                  code: 'countries',
                  label: 'Countries overview',
                  special: true,
                },
              ]}
              onClick={() => {
                onClose();
                nav(PATHS.COUNTRIES);
              }}
              special
            />
          )}
          {(!sorted || sorted.length === 0) && (
            <FormattedMessage {...messages.noResults} />
          )}
          {sorted && sorted.length > 0 && (
            <NavOptionGroup
              subject={subject}
              label="Country profiles"
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
  nav: PropTypes.func,
  // currentCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
  size: PropTypes.string,
  subject: PropTypes.string,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: country => dispatch(selectCountry(country)),
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Header: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(NavCountry));
