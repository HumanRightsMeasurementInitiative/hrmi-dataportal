import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, Drop } from 'grommet';
import styled from 'styled-components';
import Button from 'styled/Button';

import rootMessages from 'messages';

// prettier-ignore
const Styled = styled(Button)`
  text-align: right;
  padding: 3px 5px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 6px 8px;
  }
`;

function CountryButton({ country, metric, onCountryClick }) {
  const [countryOver, setCountryOver] = useState(false);
  const countryTarget = useRef(null);
  return (
    <>
      <Styled
        onClick={() => onCountryClick(country.country_code, metric.key)}
        ref={countryTarget}
        onMouseEnter={() => setCountryOver(country.country_code)}
        onMouseOver={() => setCountryOver(country.country_code)}
        onMouseLeave={() => setCountryOver(false)}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <FormattedMessage {...rootMessages.countries[country.country_code]} />
        {country && country.high_income_country === '1' && (
          <span>
            {` (`}
            <FormattedMessage {...rootMessages.labels.hiCountry} />
            {`)`}
          </span>
        )}
      </Styled>
      {countryTarget.current && countryOver === country.country_code && (
        <Drop
          target={countryTarget.current}
          align={{ bottom: 'top', right: 'right' }}
          stretch={false}
          plain
          overflow="visible"
        >
          <Box
            elevation="small"
            pad={{ horizontal: 'small', vertical: 'hair' }}
            background="white"
            round="xxsmall"
            width="160px"
            style={{ textAlign: 'right' }}
          >
            <Text>
              <FormattedMessage
                {...rootMessages[metric.metricType][metric.key]}
              />
            </Text>
            <Text style={{ fontWeight: 600 }}>
              <FormattedMessage
                {...rootMessages.countries[country.country_code]}
              />
            </Text>
          </Box>
        </Drop>
      )}
    </>
  );
}

CountryButton.propTypes = {
  onCountryClick: PropTypes.func,
  country: PropTypes.object,
  metric: PropTypes.object,
};

export default CountryButton;
