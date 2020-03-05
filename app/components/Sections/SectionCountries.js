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

import rootMessages from 'messages';
import messages from './messages';

import SectionTitle from './SectionTitle';
import Slider from './Slider';
import Card from './Card';
import AllLinkButton from './AllLinkButton';

export function SectionCountries({
  countries,
  onSelectCountry,
  navAllCountries,
  intl,
  title,
  allLink,
}) {
  return (
    <SectionContainer>
      <ContentMaxWidth maxWidth="medium" column>
        <SectionTitle
          title={title || intl.formatMessage(messages.countries.title)}
        />
        <AllLinkButton
          onClick={() => navAllCountries()}
          label={allLink || intl.formatMessage(messages.countries.allLink)}
        />
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
  title: PropTypes.string,
  allLink: PropTypes.string,
  countries: PropTypes.array,
  onSelectCountry: PropTypes.func,
  navAllCountries: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionCountries);
