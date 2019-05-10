/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button } from 'grommet';

import { selectCountry } from 'containers/App/actions';
import { getCountries } from 'containers/App/selectors';

import rootMessages from 'messages';

const Option = styled(Button)``;

export function NavCountry({ countries, onSelectCountry, intl, onClose }) {
  const sorted =
    countries &&
    countries
      .map(country => country.country_code)
      .sort((a, b) =>
        intl.formatMessage(rootMessages.countries[a]) <
        intl.formatMessage(rootMessages.countries[b])
          ? -1
          : 1,
      );

  return (
    <Box pad="small">
      {sorted &&
        sorted.map(country => (
          <Option
            plain
            key={country}
            onClick={() => {
              onClose();
              onSelectCountry(country);
            }}
          >
            <FormattedMessage {...rootMessages.countries[country]} />
          </Option>
        ))}
    </Box>
  );
}

NavCountry.propTypes = {
  onSelectCountry: PropTypes.func,
  onClose: PropTypes.func,
  // currentCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: country => dispatch(selectCountry(country)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(NavCountry));
