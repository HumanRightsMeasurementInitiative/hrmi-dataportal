/**
 *
 * CountryAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import styled from 'styled-components';
import { Button, Heading, Box, Text } from 'grommet';

import roundValue from 'utils/round-score';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

const prepPopulationValue = (value, intl) => {
  if (parseInt(value, 10) > 1000000) {
    return {
      value: intl.formatNumber(roundValue(value / 1000000, 1)),
      abbrev: 'millions',
    };
  }
  return {
    value: intl.formatNumber(roundValue(value / 1000, 1)),
    abbrev: 'thousands',
  };
};

function CountryAbout({ intl, country, auxIndicators, onCategoryClick }) {
  if (!auxIndicators || !country) return null;
  const incomeCode =
    country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';
  return (
    <Box direction="column" pad="medium">
      <Heading level={3}>
        <FormattedMessage {...messages.title} />
      </Heading>
      <Box direction="row">
        <Box width="50%">
          <Text>
            <FormattedMessage
              {...messages.population}
              values={{ year: auxIndicators.year }}
            />
          </Text>
        </Box>
        <Text>
          <FormattedMessage
            {...messages.populationValue}
            values={prepPopulationValue(
              auxIndicators[COLUMNS.AUX.POPULATION],
              intl,
            )}
          />
        </Text>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Text>
            <FormattedMessage
              {...messages.gdp}
              values={{ year: auxIndicators.year }}
            />
          </Text>
        </Box>
        <Box direction="column">
          <Text>
            <FormattedMessage
              {...messages.gdpValue}
              values={{
                value: intl.formatNumber(
                  roundValue(auxIndicators[COLUMNS.AUX.GDP], 0),
                ),
              }}
            />
          </Text>
          <Text>
            <FormattedMessage {...messages.gdpHint} />
          </Text>
        </Box>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Text>
            <FormattedMessage {...messages.oecd} />
          </Text>
        </Box>
        <Text>
          <FormattedMessage
            {...rootMessages.oecd[country[COLUMNS.COUNTRIES.OECD]]}
          />
        </Text>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Text>
            <FormattedMessage {...messages.region} />
          </Text>
        </Box>
        <Button
          onClick={() =>
            onCategoryClick('region', country[COLUMNS.COUNTRIES.REGION])
          }
        >
          <Text>
            <FormattedMessage
              {...rootMessages.regions[country[COLUMNS.COUNTRIES.REGION]]}
            />
          </Text>
        </Button>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Text>
            <FormattedMessage {...messages.income} />
          </Text>
        </Box>
        <Button onClick={() => onCategoryClick('income', incomeCode)}>
          <Text>
            <FormattedMessage {...rootMessages.income[incomeCode]} />
          </Text>
        </Button>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Text>Default assessment standard</Text>
        </Box>
        <Text>
          <FormattedMessage
            {...rootMessages.settings.standard[
              incomeCode === 'hi' ? 'hi' : 'core'
            ]}
          />
        </Text>
      </Box>
    </Box>
  );
}

CountryAbout.propTypes = {
  onCategoryClick: PropTypes.func,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryAbout);
