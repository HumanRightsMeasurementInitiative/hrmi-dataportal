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

import Tooltip from 'components/Tooltip';
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

const prepPopulationValue = (value, intl, year) => {
  if (parseInt(value, 10) > 1000000) {
    return {
      value: intl.formatNumber(roundValue(value / 1000000, 1)),
      abbrev: 'millions',
      year,
    };
  }
  return {
    value: intl.formatNumber(roundValue(value / 1000, 1)),
    abbrev: 'thousands',
    year,
  };
};

function CountryAbout({
  intl,
  country,
  auxIndicators,
  currentGDP,
  pppGDP,
  onCategoryClick,
  showFAQs,
}) {
  if (!country) return null;
  const incomeCode =
    country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';
  const hasCurrentGDP =
    currentGDP && currentGDP.value && currentGDP.value !== '';
  const hasPPPGDP = pppGDP && pppGDP.value && pppGDP.value !== '';
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
      pad={{ left: 'medium', bottom: 'medium', top: 'small' }}
    >
      <Heading responsive={false} level={3}>
        <FormattedMessage {...messages.title} />
      </Heading>
      {hasPopulation && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box width="50%">
            <Label>
              <FormattedMessage {...messages.population} />
            </Label>
          </Box>
          <Box width="50%">
            <Text>
              <FormattedMessage
                {...messages.populationValue}
                values={prepPopulationValue(
                  auxIndicators[COLUMNS.AUX.POPULATION],
                  intl,
                  auxIndicators.year,
                )}
              />
            </Text>
          </Box>
        </Box>
      )}
      {(hasCurrentGDP || hasPPPGDP) && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box direction="column" width="50%">
            <Label>
              <FormattedMessage {...messages.gdp} />
            </Label>
          </Box>
          <Box direction="column" width="50%">
            {hasCurrentGDP && (
              <Box direction="column" margin={{ bottom: 'small' }}>
                <Text>
                  <FormattedMessage
                    {...messages.gdpValue}
                    values={{
                      value: intl.formatNumber(roundValue(currentGDP.value, 0)),
                      year: currentGDP.year,
                    }}
                  />
                </Text>
                <div>
                  <Text size="xsmall">
                    <FormattedMessage {...messages.gdpHint} />
                  </Text>
                  <Tooltip
                    iconSize="medium"
                    text={intl.formatMessage(messages.gdpTooltip)}
                  />
                </div>
              </Box>
            )}
            {hasPPPGDP && (
              <Box direction="column" margin={{ bottom: 'xsmall' }}>
                <Text>
                  <FormattedMessage
                    {...messages.gdpValue}
                    values={{
                      value: intl.formatNumber(roundValue(pppGDP.value, 0)),
                      year: pppGDP.year,
                    }}
                  />
                </Text>
                <div>
                  <Text size="xsmall">
                    <FormattedMessage {...messages.gdpHintPPP} />
                  </Text>
                  <Tooltip
                    iconSize="medium"
                    text={intl.formatMessage(messages.gdpTooltipPPP)}
                  />
                </div>
              </Box>
            )}
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
              <Button key={g} onClick={() => onCategoryClick('cgroup', g)}>
                <Text>
                  <FormattedMessage {...rootMessages.countryGroups[g]} />
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
              <Button key={g} onClick={() => onCategoryClick('treaty', g)}>
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
      <FAQs questions={showFAQs} />
    </Box>
  );
}

CountryAbout.propTypes = {
  onCategoryClick: PropTypes.func,
  showFAQs: PropTypes.array,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryAbout);
