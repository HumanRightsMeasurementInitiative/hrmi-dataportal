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
          <Box direction="column" width="50%">
            <Label>
              <FormattedMessage
                {...messages.gdp}
                values={{ year: currentGDP.year }}
              />
              <Tooltip
                iconSize="medium"
                text={intl.formatMessage(messages.gdpTooltip)}
              />
            </Label>
            <Text size="xsmall">
              <FormattedMessage {...messages.gdpHint} />
            </Text>
          </Box>
          <Box direction="column" width="50%">
            <Text>
              <FormattedMessage
                {...messages.gdpValue}
                values={{
                  value: intl.formatNumber(roundValue(currentGDP.value, 0)),
                }}
              />
            </Text>
          </Box>
        </Box>
      )}
      {hasPPPGDP && (
        <Box direction="row" margin={{ bottom: 'xsmall' }}>
          <Box direction="column" width="50%">
            <Label>
              <FormattedMessage
                {...messages.gdp}
                values={{ year: pppGDP.year }}
              />
              <Tooltip
                iconSize="medium"
                text={intl.formatMessage(messages.gdpTooltipPPP)}
              />
            </Label>
            <Text size="xsmall">
              <FormattedMessage {...messages.gdpHintPPP} />
            </Text>
          </Box>
          <Box direction="column" width="50%">
            <Text>
              <FormattedMessage
                {...messages.gdpValue}
                values={{
                  value: intl.formatNumber(roundValue(pppGDP.value, 0)),
                }}
              />
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
      <Box direction="row" margin={{ bottom: 'xsmall' }}>
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
  pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryAbout);
