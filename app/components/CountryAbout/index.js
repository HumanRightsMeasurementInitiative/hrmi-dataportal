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

import FAQs from 'containers/FAQs';
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

function CountryAbout({
  intl,
  country,
  auxIndicators,
  currentGDP,
  onCategoryClick,
  showFAQs,
}) {
  if (!country) return null;
  const incomeCode =
    country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';
  const hasCurrentGDP =
    currentGDP &&
    currentGDP[COLUMNS.AUX.GDP_CURRENT] &&
    currentGDP[COLUMNS.AUX.GDP_CURRENT] !== '';
  const hasPopulation =
    auxIndicators &&
    auxIndicators[COLUMNS.AUX.POPULATION] &&
    auxIndicators[COLUMNS.AUX.POPULATION] !== '';
  const countryGroups =
    country[COLUMNS.COUNTRIES.GROUPS] &&
    country[COLUMNS.COUNTRIES.GROUPS].split(',');
  const treaties =
    country[COLUMNS.COUNTRIES.TREATIES] &&
    country[COLUMNS.COUNTRIES.TREATIES].split(',');
  return (
    <Box
      direction="column"
      pad={{ horizontal: 'medium', bottom: 'medium', top: 'small' }}
      style={{ maxWidth: '500px' }}
    >
      <Heading responsive={false} level={3}>
        <FormattedMessage {...messages.title} />
      </Heading>
      {hasPopulation && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
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
      )}
      {hasCurrentGDP && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box width="50%">
            <Label>
              <FormattedMessage
                {...messages.gdp}
                values={{ year: currentGDP.year }}
              />
            </Label>
          </Box>
          <Box direction="column" width="50%">
            <Text>
              <FormattedMessage
                {...messages.gdpValue}
                values={{
                  value: intl.formatNumber(
                    roundValue(currentGDP[COLUMNS.AUX.GDP_CURRENT], 0),
                  ),
                }}
              />
            </Text>
            <Text size="small">
              <FormattedMessage {...messages.gdpHint} />
            </Text>
          </Box>
        </Box>
      )}
      <Box direction="row" margin={{ bottom: 'xsmall' }}>
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
      {country[COLUMNS.COUNTRIES.SUBREGION] && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box width="50%">
            <Label>
              <FormattedMessage {...messages.subregion} />
            </Label>
          </Box>
          <Box width="50%">
            <Button
              onClick={() =>
                onCategoryClick(
                  'subregion',
                  country[COLUMNS.COUNTRIES.SUBREGION],
                )
              }
            >
              <Text>
                <FormattedMessage
                  {...rootMessages.subregions[
                    country[COLUMNS.COUNTRIES.SUBREGION]
                  ]}
                />
              </Text>
            </Button>
          </Box>
        </Box>
      )}
      {countryGroups && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box width="50%">
            <Label>
              <FormattedMessage
                {...messages.groups[
                  countryGroups.length === 1 ? 'single' : 'plural'
                ]}
              />
            </Label>
          </Box>
          <Box width="50%">
            {countryGroups.map(g => (
              <Button onClick={() => onCategoryClick('group', g)}>
                <Text>
                  <FormattedMessage {...rootMessages.groups[g]} />
                </Text>
              </Button>
            ))}
          </Box>
        </Box>
      )}
      {treaties && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box width="50%">
            <Label>
              <FormattedMessage
                {...messages.treaties[
                  treaties.length === 1 ? 'single' : 'plural'
                ]}
              />
            </Label>
          </Box>
          <Box width="50%">
            {treaties.map(g => (
              <Button onClick={() => onCategoryClick('treaty', g)}>
                <Text>
                  <FormattedMessage {...rootMessages.treaties[g]} />
                </Text>
              </Button>
            ))}
          </Box>
        </Box>
      )}
      <Box direction="row" margin={{ bottom: 'xsmall' }}>
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
      {showFAQs && (
        <FAQs
          questions={['scale', 'year', 'standards', 'benchmarks', 'indicators']}
        />
      )}
    </Box>
  );
}

CountryAbout.propTypes = {
  onCategoryClick: PropTypes.func,
  showFAQs: PropTypes.bool,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryAbout);
