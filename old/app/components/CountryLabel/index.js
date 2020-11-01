import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';

import { COLUMNS } from 'containers/App/constants';
import rootMessages from 'messages';

const StyledMarks = styled.span`
  font-weight: normal !important;
`;

export function CountryLabel({
  intl,
  country,
  showHILabel = true,
  showGovRespondentsLabel = true,
}) {
  if (!country) return null;
  let label = '';
  if (rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]]) {
    label = intl.formatMessage(
      rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]],
    );
  } else {
    console.log(
      'Country code not in language files:',
      country[COLUMNS.COUNTRIES.CODE],
    );
    label = country[COLUMNS.COUNTRIES.CODE];
  }
  const hiLabel = showHILabel && isCountryHighIncome(country);
  const respondentsLabel =
    showGovRespondentsLabel && hasCountryGovRespondents(country);

  return (
    <span>
      {label}
      <StyledMarks>
        {` `}
        {hiLabel && <FormattedMessage {...rootMessages.labels.hiCountry} />}
        {respondentsLabel && (
          <sup>
            <FormattedMessage {...rootMessages.labels.govResponseCountry} />
          </sup>
        )}
      </StyledMarks>
    </span>
  );
}

CountryLabel.propTypes = {
  intl: intlShape.isRequired,
  showHILabel: PropTypes.bool,
  showGovRespondentsLabel: PropTypes.bool,
  country: PropTypes.object,
};

export default injectIntl(CountryLabel);
