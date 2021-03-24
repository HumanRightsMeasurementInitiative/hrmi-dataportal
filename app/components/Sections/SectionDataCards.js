/**
 *
 * SectionDataCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { intlShape, injectIntl } from 'react-intl';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import { isMaxSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';
import SectionTitle from './SectionTitle';
import Slider from './Slider';
import CardData from './CardData';

export function SectionDataCards({
  noCountries = 0,
  noRights = 0,
  noGroups = 0,
  navCountries,
  navRights,
  navGroups,
  intl,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer background="sectionDataCards">
          <ContentMaxWidth column>
            <SectionTitle
              title={intl.formatMessage(messages.dataCards.title)}
              marginTop
            />
            <Slider
              stretch
              cardMargin={isMaxSize(size, 'sm') ? 'xsmall' : 'small'}
            >
              <CardData
                onClick={navRights}
                no={noRights}
                title={intl.formatMessage(messages.dataCards.metrics)}
                teaser={intl.formatMessage(messages.dataCards.metricsTeaser)}
                anchor={intl.formatMessage(rootMessages.labels.allMetrics)}
                measureWord={
                  intl.locale === 'zh'
                    ? intl.formatMessage(messages.dataCards.metricsMeasureWord)
                    : null
                }
              />
              <CardData
                onClick={navCountries}
                no={noCountries}
                title={intl.formatMessage(messages.dataCards.countries)}
                teaser={intl.formatMessage(messages.dataCards.countriesTeaser)}
                anchor={intl.formatMessage(rootMessages.labels.allCountries)}
                measureWord={
                  // prettier-ignore
                  intl.locale === 'zh'
                    ? intl.formatMessage(
                      messages.dataCards.countriesMeasureWord,
                    )
                    : null
                }
              />
              <CardData
                onClick={navGroups}
                no={noGroups}
                title={intl.formatMessage(messages.dataCards.people)}
                teaser={intl.formatMessage(messages.dataCards.peopleTeaser)}
                anchor={intl.formatMessage(rootMessages.labels.allPeople)}
                measureWord={
                  intl.locale === 'zh'
                    ? intl.formatMessage(messages.dataCards.peopleMeasureWord)
                    : null
                }
              />
            </Slider>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionDataCards.propTypes = {
  noCountries: PropTypes.number,
  noRights: PropTypes.number,
  noGroups: PropTypes.number,
  navCountries: PropTypes.func,
  navRights: PropTypes.func,
  navGroups: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionDataCards);
