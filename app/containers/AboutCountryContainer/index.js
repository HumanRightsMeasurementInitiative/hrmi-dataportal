/**
 *
 * AboutCountryContainer
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';
import { Up, Down } from 'grommet-icons';

import { selectCountry } from 'containers/App/actions';

import {
  getCountry,
  getLatestCountryPopulation,
  getLatestCountryCurrentGDP,
  getLatestCountry2011PPPGDP,
  getCountriesGrammar,
} from 'containers/App/selectors';
import Tooltip from 'components/Tooltip';
import { COLUMNS } from 'containers/App/constants';

import FAQs from 'containers/FAQs';
import ButtonText from 'styled/ButtonText';
import ButtonAccordian from 'styled/ButtonAccordian';
import ButtonHero from 'styled/ButtonHero';

import { roundScore } from 'utils/scores';
import { getTerritoryStatus } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';

const Button = styled(ButtonText)`
  font-weight: 400;
`;

const Label = styled(Text)`
  font-weight: 600;
  @media print {
    font-size: 12px;
  }
`;

const Detail = styled(Text)`
  @media print {
    font-size: 12px;
    padding: 0px;
  }
`;

const Hint = styled(Text)`
  @media print {
    font-size: 10px;
  }
`;

const MoreWrap = styled.div`
  text-align: left;
  margin-top: 10px;
  justify-content: space-between;
`;

const ContainerBox = styled(Box)`
  flex-direction: column;
  padding-top: 48px;
  padding-bottom: 24px;
  @media print {
    flex-direction: row;
    justify-content: space-between;
    background-color: #262064;
    color: white;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const RowBox = styled(Box)`
  flex-direction: column;
  width: 50%;
  @media print {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const DetailBox = styled(Box)`
  flex-direction: row;
  @media print {
    flex: 1;
    flex-direction: column;
    margin-bottom: 8px;
  }
`;

const HeadingBox = styled(Box)`
  @media print {
    flex: 1;
  }
`;

const RemoveFromPDFWrapper = styled.div`
  @media print {
    display: none;
  }
`;

const prepPopulationValue = (value, intl, year) => {
  if (intl.locale === 'zh') {
    if (parseInt(value, 10) > 1000000000) {
      return {
        value: intl.formatNumber(roundScore(value / 100000000, 1)),
        abbrev: 'billions',
        year,
      };
    }
    return {
      value: intl.formatNumber(roundScore(value / 10000, 1)),
      abbrev: 'myriad',
      year,
    };
  }
  if (parseInt(value, 10) > 1000000) {
    return {
      value: intl.formatNumber(roundScore(value / 1000000, 1)),
      abbrev: 'millions',
      year,
    };
  }
  return {
    value: intl.formatNumber(roundScore(value / 1000, 1)),
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
  currentGDP,
  pppGDP,
  population,
  onCategoryClick,
  onCountryClick,
  showFAQs,
  showTitle,
  countryCode,
  showCountryLink,
  collapsible = true,
  inverse,
  inAside,
  countriesGrammar,
  asideRef,
}) {
  const [more, setMore] = useState(false);
  if (!country) return null;
  const incomeCode =
    country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';
  const hasCurrentGDP =
    currentGDP && currentGDP.value && currentGDP.value !== '';
  const hasPPPGDP = pppGDP && pppGDP.value && pppGDP.value !== '';
  const hasPopulation =
    population && population.value && population.value !== '';

  const countryGroups =
    country[COLUMNS.COUNTRIES.GROUPS] &&
    country[COLUMNS.COUNTRIES.GROUPS].split(',');
  const treaties =
    country[COLUMNS.COUNTRIES.TREATIES] &&
    country[COLUMNS.COUNTRIES.TREATIES].split(',');

  const countryStatus = country[COLUMNS.COUNTRIES.STATUS];

  return (
    <ContainerBox pad={{ left: 'medium' }}>
      <div ref={asideRef}>
        <HeadingBox>
          <Heading responsive={false} level={3}>
            {!showTitle && <FormattedMessage {...messages.title} />}
            {showTitle && (
              <FormattedMessage {...rootMessages.countries[countryCode]} />
            )}
          </Heading>
        </HeadingBox>
        {countriesGrammar && countryStatus.trim() !== '' && (
          <DetailBox margin={{ bottom: 'xsmall' }}>
            <Box width="50%">
              <Label>
                <FormattedMessage {...messages.countryStatus} />
              </Label>
            </Box>
            <RowBox margin={{ bottom: 'small' }}>
              <Detail>
                {getTerritoryStatus(
                  countryStatus,
                  country[COLUMNS.COUNTRIES.RELATED],
                  countriesGrammar.find(
                    c => c.country_code === country[COLUMNS.COUNTRIES.RELATED],
                  ),
                  intl,
                )}
              </Detail>
            </RowBox>
          </DetailBox>
        )}
        {hasPopulation && (
          <DetailBox margin={{ bottom: 'xsmall' }}>
            <Box width="50%">
              <Label>
                <FormattedMessage {...messages.population} />
              </Label>
            </Box>
            <RowBox width="50%">
              <Detail>
                <FormattedMessage
                  {...messages.populationValue}
                  values={prepPopulationValue(
                    population.value,
                    intl,
                    population.year,
                  )}
                />
              </Detail>
            </RowBox>
          </DetailBox>
        )}
        {(hasCurrentGDP || hasPPPGDP) && (
          <DetailBox margin={{ bottom: 'xsmall' }}>
            <Box direction="column" width="50%">
              <Label>
                <FormattedMessage {...messages.gdp} />
              </Label>
            </Box>
            <RowBox>
              {hasCurrentGDP && (
                <Box direction="column" margin={{ bottom: 'small' }}>
                  <Detail>
                    <FormattedMessage
                      {...messages.gdpValue}
                      values={{
                        value: intl.formatNumber(
                          roundScore(currentGDP.value, 0),
                        ),
                        year: currentGDP.year,
                      }}
                    />
                  </Detail>
                  <div>
                    <Hint size="xsmall">
                      <FormattedMessage {...messages.gdpHint} />
                    </Hint>
                    <Tooltip
                      iconSize="medium"
                      text={intl.formatMessage(messages.gdpTooltip)}
                      inverse={inverse}
                      inAside={inAside}
                      superscript
                    />
                  </div>
                </Box>
              )}
              {hasPPPGDP && (
                <Box direction="column" margin={{ bottom: 'xsmall' }}>
                  <Detail>
                    <FormattedMessage
                      {...messages.gdpValue}
                      values={{
                        value: intl.formatNumber(roundScore(pppGDP.value, 0)),
                        year: pppGDP.year,
                      }}
                    />
                  </Detail>
                  <div>
                    <Hint size="xsmall">
                      <FormattedMessage {...messages.gdpHintPPP} />
                    </Hint>
                    <Tooltip
                      iconSize="medium"
                      text={intl.formatMessage(messages.gdpTooltipPPP)}
                      inverse={inverse}
                      inAside={inAside}
                      superscript
                    />
                  </div>
                </Box>
              )}
            </RowBox>
          </DetailBox>
        )}
        {(!collapsible || more) && (
          <>
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
                      rootMessages.subregions[
                        country[COLUMNS.COUNTRIES.SUBREGION]
                      ],
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
          </>
        )}
        {collapsible && (
          <RemoveFromPDFWrapper>
            <MoreWrap>
              <ButtonAccordian
                onClick={() => setMore(!more)}
                icon={more ? <Up size="small" /> : <Down size="small" />}
                color={inverse ? 'white' : 'dark'}
                size="small"
                label={
                  <FormattedMessage {...messages[more ? 'less' : 'more']} />
                }
              />
            </MoreWrap>
          </RemoveFromPDFWrapper>
        )}
      </div>
      {showFAQs && <FAQs questions={showFAQs} />}
      {showCountryLink && (
        <div>
          <ButtonHero onClick={() => onCountryClick(countryCode)}>
            <FormattedMessage
              {...messages.countryLink}
              values={{
                country: intl.formatMessage(
                  rootMessages.countries[countryCode],
                ),
              }}
            />
          </ButtonHero>
        </div>
      )}
    </ContainerBox>
  );
}

AboutCountryContainer.propTypes = {
  onCategoryClick: PropTypes.func,
  onCountryClick: PropTypes.func,
  showFAQs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  showTitle: PropTypes.bool,
  showCountryLink: PropTypes.bool,
  collapsible: PropTypes.bool,
  inverse: PropTypes.bool,
  inAside: PropTypes.bool,
  countryCode: PropTypes.string,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  countriesGrammar: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  population: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
  asideRef: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countriesGrammar: state => getCountriesGrammar(state),
  currentGDP: (state, { countryCode }) =>
    getLatestCountryCurrentGDP(state, countryCode),
  pppGDP: (state, { countryCode }) =>
    getLatestCountry2011PPPGDP(state, countryCode),
  population: (state, { countryCode }) =>
    getLatestCountryPopulation(state, countryCode),
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
