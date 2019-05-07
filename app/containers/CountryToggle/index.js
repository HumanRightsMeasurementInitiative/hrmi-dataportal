/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import Toggle from 'components/Toggle';

import { selectCountry } from 'containers/App/actions';
import { getCountries } from 'containers/App/selectors';

import rootMessages from 'messages';

import Wrapper from './Wrapper';

export function CountryToggle(props) {
  return (
    <Wrapper>
      {props.countries && (
        <Toggle
          value={props.currentCountry}
          values={props.countries
            .map(country => country.country_code)
            .sort((a, b) =>
              props.intl.formatMessage(rootMessages.countries[a]) <
              props.intl.formatMessage(rootMessages.countries[b])
                ? -1
                : 1,
            )}
          messages={rootMessages.countries}
          onToggle={props.onSelectCountry}
        />
      )}
    </Wrapper>
  );
}

CountryToggle.propTypes = {
  onSelectCountry: PropTypes.func,
  currentCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: evt => dispatch(selectCountry(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(CountryToggle));
