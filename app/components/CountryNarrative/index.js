/**
 *
 * CountryNarrative
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Paragraph } from 'grommet';

import rootMessages from 'messages';

import { BENCHMARKS, STANDARDS } from 'containers/App/constants';
import { hasCPR } from 'utils/scores';
import { getMessageGrammar } from 'utils/narrative';

import messages from './messages';
import NarrativeCPR from './NarrativeCPR';
import NarrativeESR from './NarrativeESR';
import NarrativeAtRisk from './NarrativeAtRisk';
import NarrativeCPRCompAssessment from './NarrativeCPRCompAssessment';
import NarrativeESRCompAssessment from './NarrativeESRCompAssessment';

const Styled = props => <Box direction="column" {...props} />;

const RightsType = styled(Box)`
  padding-bottom: 50px;
`;
const Dimension = styled(Box)`
  padding-bottom: 30px;
`;

const RightsTypeHeading = props => (
  <Heading
    responsive={false}
    level={3}
    margin={{ vertical: '5px' }}
    {...props}
  />
);

const DimensionHeading = props => (
  <Heading
    responsive={false}
    level={4}
    margin={{ vertical: '5px' }}
    {...props}
  />
);
const StyledDimensionHeading = styled(DimensionHeading)``;

// const isDefaultStandard = (standard, country) =>
//   (standard === 'hi' && country.high_income_country === '1') ||
//   (standard === 'core' && country.high_income_country === '0');

const getDefaultStandard = country =>
  country.high_income_country === '1' ? 'hi' : 'core';

const getIncomeCategory = country =>
  country.high_income_country === '1' ? 'hi' : 'lmi';

const renderStandardHint = (intl, standard, country) => (
  <Paragraph>
    <strong>
      <FormattedMessage
        {...messages.esr.changeStandardNote}
        values={{
          otherStandard: intl.formatMessage(
            rootMessages.settings.standard[standard],
          ),
          defaultStandard: intl.formatMessage(
            rootMessages.settings.standard[getDefaultStandard(country)],
          ),
          incomeCategory: intl.formatMessage(
            rootMessages.income[getIncomeCategory(country)],
          ),
        }}
      />
    </strong>
  </Paragraph>
);

function CountryNarrative({
  dimensions,
  rights,
  indicators,
  benchmark,
  country,
  countryGrammar,
  atRiskData,
  onAtRiskClick,
  standard,
  intl,
  reference,
  esrYear,
  cprYear,
  type,
}) {
  if (!dimensions || !rights) {
    return null;
  }
  if (type === 'esr') {
    if (!indicators) {
      return null;
    }
    const currentStandard = STANDARDS.find(s => s.key === standard);
    const hasSomeIndicatorScores = Object.values(indicators)
      .filter(s => {
        if (!s.details) return false;
        return (
          s.details.standard === 'Both' ||
          s.details.standard === currentStandard.code
        );
      })
      .reduce((m, s) => m || !!s.score, false);
    return (
      <Styled>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].esr} />
            {` (${esrYear})`}
          </RightsTypeHeading>
          <Dimension>
            <StyledDimensionHeading>
              <FormattedMessage {...rootMessages.dimensions.esr} />
            </StyledDimensionHeading>
            {getDefaultStandard(country) !== standard &&
              renderStandardHint(intl, standard, country)}
            <NarrativeESR
              score={dimensions.esr && dimensions.esr.score}
              country={country}
              countryGrammar={countryGrammar}
              someData={hasSomeIndicatorScores}
            />
          </Dimension>
        </RightsType>
        {dimensions.esr && dimensions.esr.score && (
          <RightsType>
            <RightsTypeHeading>
              <FormattedMessage
                {...messages.compAssessmentSectionTitle}
                values={getMessageGrammar(
                  intl,
                  country.country_code,
                  country.region_code,
                  countryGrammar,
                )}
              />
            </RightsTypeHeading>
            {dimensions.esr &&
              dimensions.esr.score &&
              getDefaultStandard(country) !== standard &&
              renderStandardHint(intl, standard, country)}
            {dimensions.esr && reference && reference.esr && (
              <Paragraph>
                <NarrativeESRCompAssessment
                  country={country}
                  countryGrammar={countryGrammar}
                  score={dimensions.esr.score}
                  referenceScore={reference.esr[standard].average[benchmark]}
                  referenceCount={reference.esr[standard].count}
                  benchmark={BENCHMARKS.find(s => s.key === benchmark)}
                />
              </Paragraph>
            )}
          </RightsType>
        )}
      </Styled>
    );
  }
  if (type === 'cpr') {
    return (
      <Styled>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].cpr} />
            {` (${cprYear})`}
          </RightsTypeHeading>
          {dimensions.empowerment && dimensions.empowerment.score && (
            <Dimension>
              <StyledDimensionHeading>
                <FormattedMessage {...rootMessages.dimensions.empowerment} />
              </StyledDimensionHeading>
              <NarrativeCPR
                dimensionKey="empowerment"
                score={dimensions.empowerment && dimensions.empowerment.score}
                country={country}
                countryGrammar={countryGrammar}
              />
            </Dimension>
          )}
          {dimensions.physint && dimensions.physint.score && (
            <Dimension>
              <StyledDimensionHeading>
                <FormattedMessage {...rootMessages.dimensions.physint} />
              </StyledDimensionHeading>
              <NarrativeCPR
                dimensionKey="physint"
                score={dimensions.physint && dimensions.physint.score}
                country={country}
                countryGrammar={countryGrammar}
              />
            </Dimension>
          )}
          {!hasCPR(dimensions) && (
            <NarrativeCPR
              noData
              country={country}
              countryGrammar={countryGrammar}
            />
          )}
        </RightsType>
        {hasCPR(dimensions) && (
          <RightsType>
            <RightsTypeHeading>
              <FormattedMessage {...messages.atRiskSectionTitle} />
            </RightsTypeHeading>
            <NarrativeAtRisk
              country={country}
              countryGrammar={countryGrammar}
              noData={!hasCPR(dimensions)}
              data={atRiskData}
              onAtRiskClick={onAtRiskClick}
            />
          </RightsType>
        )}
        {hasCPR(dimensions) && (
          <RightsType>
            <RightsTypeHeading>
              <FormattedMessage
                {...messages.compAssessmentSectionTitle}
                values={getMessageGrammar(
                  intl,
                  country.country_code,
                  country.region_code,
                  countryGrammar,
                )}
              />
            </RightsTypeHeading>
            {hasCPR(dimensions) && reference.empowerment && reference.physint && (
              <Paragraph>
                <NarrativeCPRCompAssessment
                  dimensionKey="empowerment"
                  score={dimensions.empowerment && dimensions.empowerment.score}
                  country={country}
                  countryGrammar={countryGrammar}
                  referenceScore={reference.empowerment.average}
                  referenceCount={reference.empowerment.count}
                  start
                />
                <NarrativeCPRCompAssessment
                  conjunct
                  dimensionKey="physint"
                  score={dimensions.physint && dimensions.physint.score}
                  country={country}
                  countryGrammar={countryGrammar}
                  referenceScore={reference.physint.average}
                  referenceCount={reference.physint.count}
                />
              </Paragraph>
            )}
          </RightsType>
        )}
      </Styled>
    );
  }
  return null;
}

CountryNarrative.propTypes = {
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  trackEvent: PropTypes.func,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  type: PropTypes.string,
  onRawChange: PropTypes.func,
  raw: PropTypes.bool,
};

export default injectIntl(CountryNarrative);
