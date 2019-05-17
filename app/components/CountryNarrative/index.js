/**
 *
 * CountryNarrative
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';

import rootMessages from 'messages';

import { BENCHMARKS } from 'containers/App/constants';
import { getRightsScoresForDimension } from 'utils/scores';

import messages from './messages';
import CPRAccordion from './CPRAccordion';
import ESRAccordion from './ESRAccordion';
import NarrativeCPR from './NarrativeCPR';
import NarrativeESR from './NarrativeESR';
import NarrativeAtRisk from './NarrativeAtRisk';

const Styled = props => <Box direction="column" {...props} />;

const RightsType = styled(Box)`
  padding-bottom: 50px;
`;
const Dimension = styled(Box)`
  padding-bottom: 30px;
`;

const RightsTypeHeading = props => (
  <Heading level={3} margin={{ vertical: '5px' }} {...props} />
);

const DimensionHeading = props => (
  <Heading level={4} margin={{ vertical: '5px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)``;

const hasCPR = dimensions =>
  dimensions.physint &&
  dimensions.physint.score &&
  dimensions.empowerment &&
  dimensions.empowerment.score;

function CountryNarrative({
  dimensions,
  rights,
  indicators,
  benchmark,
  onMetricClick,
  country,
  atRiskData,
  onAtRiskClick,
}) {
  if (!dimensions || !rights || !indicators) {
    return null;
  }

  return (
    <Styled>
      <RightsType>
        <RightsTypeHeading>
          <FormattedMessage {...rootMessages['rights-types'].cpr} />
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
            />
            <CPRAccordion
              dimension={dimensions.empowerment}
              dimensionKey="empowerment"
              rights={getRightsScoresForDimension(rights, 'empowerment', true)}
              onMetricClick={onMetricClick}
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
            />
            <CPRAccordion
              dimension={dimensions.physint}
              dimensionKey="physint"
              rights={getRightsScoresForDimension(rights, 'physint', true)}
              onMetricClick={onMetricClick}
            />
          </Dimension>
        )}
        {!hasCPR(dimensions) && <NarrativeCPR noData country={country} />}
      </RightsType>
      <RightsType>
        <RightsTypeHeading>
          <FormattedMessage {...rootMessages['rights-types'].esr} />
        </RightsTypeHeading>
        <Dimension>
          <StyledDimensionHeading>
            <FormattedMessage {...rootMessages.dimensions.esr} />
          </StyledDimensionHeading>
          <NarrativeESR
            score={dimensions.esr && dimensions.esr.score}
            country={country}
          />
          <ESRAccordion
            dimension={dimensions.esr}
            dimensionKey="esr"
            rights={getRightsScoresForDimension(rights, 'esr')}
            benchmark={BENCHMARKS.find(s => s.key === benchmark)}
            indicators={Object.values(indicators)}
            onMetricClick={onMetricClick}
          />
        </Dimension>
      </RightsType>
      <RightsType>
        <RightsTypeHeading>
          <FormattedMessage {...messages.atRiskSectionTitle} />
        </RightsTypeHeading>
        <NarrativeAtRisk
          country={country}
          noData={!hasCPR(dimensions)}
          data={atRiskData}
          onAtRiskClick={onAtRiskClick}
        />
      </RightsType>
      <RightsType>
        <RightsTypeHeading>
          <FormattedMessage {...messages.compAssessmentSectionTitle} />
        </RightsTypeHeading>
      </RightsType>
    </Styled>
  );
}

CountryNarrative.propTypes = {
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CountryNarrative;
