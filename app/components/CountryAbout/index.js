/**
 *
 * CountryAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';

import roundValue from 'utils/round-score';

import { COLUMNS } from 'containers/App/constants';

import ButtonText from 'styled/ButtonText';

import rootMessages from 'messages';
import messages from './messages';

const Button = styled(ButtonText)`
  font-weight: 400;
`;

const Label = styled(Text)`
  font-weight: 600;
`;

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
    <Box direction="column" pad={{ left: 'medium', vertical: 'medium' }}>
      <Heading level={3}>
        <FormattedMessage {...messages.title} />
      </Heading>
      <Box direction="row">
        <Box width="50%">
          <Label>
            <FormattedMessage
              {...messages.population}
              values={{ year: auxIndicators.year }}
            />
          </Label>
        </Box>
        <Box width="50%">
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
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Label>
            <FormattedMessage
              {...messages.gdp}
              values={{ year: auxIndicators.year }}
            />
          </Label>
        </Box>
        <Box direction="column" width="50%">
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
          <Text size="small">
            <FormattedMessage {...messages.gdpHint} />
          </Text>
        </Box>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Label>
            <FormattedMessage {...messages.region} />
          </Label>
        </Box>
        <Box width="50%">
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
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Label>
            <FormattedMessage {...messages.oecd} />
          </Label>
        </Box>
        <Box width="50%">
          <Button
            onClick={() =>
              onCategoryClick('oecd', country[COLUMNS.COUNTRIES.OECD])
            }
          >
            <Text>
              <FormattedMessage
                {...rootMessages.oecd[country[COLUMNS.COUNTRIES.OECD]]}
              />
            </Text>
          </Button>
        </Box>
      </Box>
      <Box direction="row">
        <Box width="50%">
          <Label>
            <FormattedMessage {...messages.income} />
          </Label>
        </Box>
        <Box width="50%">
          <Button onClick={() => onCategoryClick('income', incomeCode)}>
            <Text>
              <FormattedMessage {...rootMessages.income[incomeCode]} />
            </Text>
          </Button>
        </Box>
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
