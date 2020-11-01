/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Box, ResponsiveContext } from 'grommet';
import { COLUMNS, IMAGE_PATH } from 'containers/App/constants';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import { isMaxSize, isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

import SectionTitle from './SectionTitle';
import Slider from './Slider';
import Card from './Card';
import AllLinkButton from './AllLinkButton';

export function SectionCountries ({
  countries,
  onSelectCountry,
  navAllCountries,
  intl,
  title,
  allLink,
  onCatClick,
}) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer>
          <ContentMaxWidth column>
            <Box
              direction="row"
              align="center"
              margin={{ top: 'small' }}
              justify="between"
            >
              <SectionTitle
                title={title || intl.formatMessage(messages.countries.title)}
              />
              {isMinSize(size, 'medium') && (
                <AllLinkButton
                  onClick={() => navAllCountries()}
                  label={allLink || intl.formatMessage(rootMessages.labels.allCountries)}
                />
              )}
            </Box>
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
                  const catLabel = cats && intl.formatMessage(
                    rootMessages.featured[cats[0]]
                  );
                  return (
                    <Card
                      key={country[COLUMNS.COUNTRIES.CODE]}
                      margin="xsmall"
                      onCardClick={() =>
                        onSelectCountry(country[COLUMNS.COUNTRIES.CODE])
                      }
                      imageSrc={
                        `${IMAGE_PATH}/country_${country[COLUMNS.COUNTRIES.CODE]}.png`
                      }
                      label={
                        rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]]
                          ? intl.formatMessage(
                            rootMessages.countries[
                              country[COLUMNS.COUNTRIES.CODE]
                            ],
                          )
                          : country[COLUMNS.COUNTRIES.CODE]
                      }
                      banner={{
                        label: catLabel,
                        onClick: () => onCatClick(cats[0]),
                      }}
                      type="photos"
                    />
                  );
                })}
              </Slider>
            )}
            {isMaxSize(size, 'sm') && (
              <Box margin={{ top: 'medium' }}>
                <AllLinkButton
                  onClick={() => navAllCountries()}
                  label={allLink || intl.formatMessage(rootMessages.labels.allCountries)}
                />
              </Box>
            )}
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}
// {` (${catLabels})`}

SectionCountries.propTypes = {
  title: PropTypes.string,
  allLink: PropTypes.string,
  countries: PropTypes.array,
  onSelectCountry: PropTypes.func,
  navAllCountries: PropTypes.func,
  onCatClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionCountries);
