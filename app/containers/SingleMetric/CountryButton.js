import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from 'styled/Button';

import rootMessages from 'messages';

// prettier-ignore
const Styled = styled(Button)`
  text-align: right;
  padding: 2px 3px;
  line-height: 16px;
  min-height: 26px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 8px;
    min-height: 40px;
    line-height: 19px;
  }
`;

function CountryButton({ country, metric, onCountryClick }) {
  // prettier-ignore
  return (
    <>
      <Styled onClick={() => onCountryClick(country.country_code, metric.key)}>
        <FormattedMessage {...rootMessages.countries[country.country_code]} />
        {metric &&
          (metric.type === 'esr' || metric.metricType === 'indicators') &&
          country &&
          country.high_income_country === '1' && (
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
