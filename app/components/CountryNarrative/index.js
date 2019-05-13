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
import { getRightsScoresForDimension } from 'utils/scores';

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

function CountryNarrative({ dimensions, rights, indicators, benchmark }) {
  if (!dimensions || !rights || !indicators) {
    return null;
  }

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
            dimension={dimensions.empowerment}
            dimensionKey="empowerment"
            rights={getRightsScoresForDimension(rights, 'empowerment', true)}
          />
        </Dimension>
        <Dimension>
          <StyledDimensionHeading>
            <FormattedMessage {...rootMessages.dimensions.physint} />
          </StyledDimensionHeading>
          <Text>TODO: Physical integrity narrative</Text>
          <CPRAccordion
            dimension={dimensions.physint}
            dimensionKey="physint"
            rights={getRightsScoresForDimension(rights, 'physint', true)}
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
            dimension={dimensions.esr}
            dimensionKey="esr"
            rights={getRightsScoresForDimension(rights, 'esr')}
            benchmark={BENCHMARKS.find(s => s.key === benchmark)}
            indicators={Object.values(indicators)}
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
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CountryNarrative;
