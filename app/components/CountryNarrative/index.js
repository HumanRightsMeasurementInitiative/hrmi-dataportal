/**
 *
 * CountryNarrative
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';

import rootMessages from 'messages';

import { BENCHMARKS } from 'containers/App/constants';

import CPRAccordion from './CPRAccordion';
import ESRAccordion from './ESRAccordion';

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

function CountryNarrative({
  dimensions,
  rights,
  indicators,
  indicatorDetails,
  benchmark,
}) {
  if (!dimensions || !rights || !indicators || !indicatorDetails) {
    return null;
  }
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // figure out rights scores

  return (
    <Styled>
      <RightsType>
        <RightsTypeHeading>
          <FormattedMessage {...rootMessages['rights-types'].cpr} />
        </RightsTypeHeading>
        <Dimension>
          <StyledDimensionHeading>
            <FormattedMessage {...rootMessages.dimensions.empowerment} />
          </StyledDimensionHeading>
          <Text>TODO: Empowerment narrative</Text>
          <CPRAccordion
            dimensions={dimensions.cpr}
            dimensionKey="empowerment"
            rights={rights.cpr}
          />
        </Dimension>
        <Dimension>
          <StyledDimensionHeading>
            <FormattedMessage {...rootMessages.dimensions.physint} />
          </StyledDimensionHeading>
          <Text>TODO: Physical integrity narrative</Text>
          <CPRAccordion
            dimensions={dimensions.cpr}
            dimensionKey="physint"
            rights={rights.cpr}
          />
        </Dimension>
      </RightsType>
      <RightsType>
        <RightsTypeHeading>
          <FormattedMessage {...rootMessages['rights-types'].esr} />
        </RightsTypeHeading>
        <Dimension>
          <StyledDimensionHeading>
            <FormattedMessage {...rootMessages.dimensions.esr} />
          </StyledDimensionHeading>
          <Text>TODO: Quality of Life narrative</Text>
          <ESRAccordion
            dimensions={dimensions.esr}
            dimensionKey="esr"
            rights={rights.esr}
            benchmark={currentBenchmark}
            indicators={indicators}
            indicatorDetails={indicatorDetails}
          />
        </Dimension>
      </RightsType>
      <RightsType>
        <RightsTypeHeading>TODO: People at risk</RightsTypeHeading>
      </RightsType>
      <RightsType>
        <RightsTypeHeading>TODO: Comparative assessment</RightsTypeHeading>
      </RightsType>
    </Styled>
  );
}

CountryNarrative.propTypes = {
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicatorDetails: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CountryNarrative;
