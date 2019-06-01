import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from 'styled/Button';

import rootMessages from 'messages';

// prettier-ignore
const Styled = styled(Button)`
  text-align: right;
  padding: 3px 5px;
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 6px 8px;
  }
`;

function CountryButton({ country, metric, onCountryClick }) {
  return (
    <>
      <Styled onClick={() => onCountryClick(country.country_code, metric.key)}>
        <FormattedMessage {...rootMessages.countries[country.country_code]} />
        {country && country.high_income_country === '1' && (
          <span>
            {` (`}
            <FormattedMessage {...rootMessages.labels.hiCountry} />
            {`)`}
          </span>
        )}
      </Styled>
    </>
  );
}

CountryButton.propTypes = {
  onCountryClick: PropTypes.func,
  country: PropTypes.object,
  metric: PropTypes.object,
};

export default CountryButton;
