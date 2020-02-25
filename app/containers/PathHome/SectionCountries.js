/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { COLUMNS } from 'containers/App/constants';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import ButtonText from 'styled/ButtonText';
// import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';

import Slider from './Slider';
import Card from './Card';

// const Button = styled(ButtonPlain)`
//   margin: 0 auto;
//   @media (min-width: 520px) {
//     margin: 0;
//   }
//   &:hover {
//     text-decoration: underline;
//   }
// `;

export function SectionCountries({
  countries,
  onSelectCountry,
  navAllCountries,
  intl,
}) {
  return (
    <SectionContainer border>
      <ContentMaxWidth maxWidth="medium" column>
        Section Featured Countries
        <ButtonText onClick={() => navAllCountries()}>
          Countries overview
        </ButtonText>
        {countries && (
          <Slider cardMargin="xsmall">
            {countries.map(country => {
              if (!rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]]) {
                console.log(
                  'Country code not in language files:',
                  country[COLUMNS.COUNTRIES.CODE],
                );
                return null;
              }
              const cats = country.featured.split(',');
              const catLabels = cats.reduce(
                (memo, cat) =>
                  `${memo}${memo === '' ? '' : ', '}${intl.formatMessage(
                    rootMessages.featured[cat],
                  )}`,
                '',
              );
              return (
                <Card
                  key={country[COLUMNS.COUNTRIES.CODE]}
                  margin="xsmall"
                  onCardClick={() =>
                    onSelectCountry(country[COLUMNS.COUNTRIES.CODE])
                  }
                >
                  {rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]] && (
                    <FormattedMessage
                      {...rootMessages.countries[
                        country[COLUMNS.COUNTRIES.CODE]
                      ]}
                    />
                  )}
                  {!rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]] && (
                    <span>{country[COLUMNS.COUNTRIES.CODE]}</span>
                  )}
                  {` (${catLabels})`}
                </Card>
              );
            })}
          </Slider>
        )}
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionCountries.propTypes = {
  countries: PropTypes.array,
  onSelectCountry: PropTypes.func,
  navAllCountries: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionCountries);
