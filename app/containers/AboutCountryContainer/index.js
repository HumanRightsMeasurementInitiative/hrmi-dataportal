/**
 *
 * AboutCountryContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';

import roundValue from 'utils/round-score';

import { selectCountry } from 'containers/App/actions';

import {
  getCountry,
  getAuxIndicatorsForCountry,
  getLatestCountryCurrentGDP,
  getLatestCountry2011PPPGDP,
} from 'containers/App/selectors';

import Tooltip from 'components/Tooltip';
import { COLUMNS } from 'containers/App/constants';

import FAQs from 'containers/FAQs';
import ButtonText from 'styled/ButtonText';
import ButtonHighlight from 'styled/ButtonHighlight';

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

const renderCategory = (label, onClick, cat, value) =>
  onClick ? (
    <Button onClick={() => onClick(cat, value)}>
      <Text>{label}</Text>
    </Button>
  ) : (
    <Text>{label}</Text>
  );

function AboutCountryContainer({
  intl,
  country,
  auxIndicators,
  currentGDP,
  pppGDP,
  onCategoryClick,
  onCountryClick,
  showFAQs,
  showTitle,
  countryCode,
  showCountryLink,
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
        {!showTitle && <FormattedMessage {...messages.title} />}
        {showTitle && (
          <FormattedMessage {...rootMessages.countries[countryCode]} />
        )}
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
          {renderCategory(
            intl.formatMessage(
              rootMessages.regions[country[COLUMNS.COUNTRIES.REGION]],
            ),
            onCategoryClick,
            'region',
            country[COLUMNS.COUNTRIES.REGION],
          )}
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
            {renderCategory(
              intl.formatMessage(
                rootMessages.subregions[country[COLUMNS.COUNTRIES.SUBREGION]],
              ),
              onCategoryClick,
              'subregion',
              country[COLUMNS.COUNTRIES.SUBREGION],
            )}
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
              <span key={g}>
                {renderCategory(
                  intl.formatMessage(rootMessages.countryGroups[g]),
                  onCategoryClick,
                  'cgroup',
                  g,
                )}
              </span>
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
              <span key={g}>
                {renderCategory(
                  intl.formatMessage(rootMessages.treaties[g]),
                  onCategoryClick,
                  'treaty',
                  g,
                )}
              </span>
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
          {renderCategory(
            intl.formatMessage(rootMessages.income[incomeCode]),
            onCategoryClick,
            'income',
            incomeCode,
          )}
        </Box>
      </Box>
      {showFAQs && <FAQs questions={showFAQs} />}
      {showCountryLink && (
        <ButtonHighlight onClick={() => onCountryClick(countryCode)}>
          {`Explore ${intl.formatMessage(rootMessages.countries[countryCode])}`}
        </ButtonHighlight>
      )}
    </Box>
  );
}

AboutCountryContainer.propTypes = {
  onCategoryClick: PropTypes.func,
  onCountryClick: PropTypes.func,
  showFAQs: PropTypes.array,
  showTitle: PropTypes.bool,
  showCountryLink: PropTypes.bool,
  countryCode: PropTypes.string,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  currentGDP: (state, { countryCode }) =>
    getLatestCountryCurrentGDP(state, countryCode),
  pppGDP: (state, { countryCode }) =>
    getLatestCountry2011PPPGDP(state, countryCode),
  auxIndicators: (state, { countryCode }) =>
    getAuxIndicatorsForCountry(state, countryCode),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCountryClick: code => dispatch(selectCountry(code)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutCountryContainer));
