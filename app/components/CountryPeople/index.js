/**
 *
 * CountryPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Text, Box } from 'grommet';

import rootMessages from 'messages';
import { FormattedMessage } from 'react-intl';

import WordCloud from 'components/WordCloud';
import messages from './messages';

const Styled = styled(Box)`
  margin: 0 auto;
  max-width: 1000px;
`;

const DimensionHeading = props => (
  <Heading level={3} margin={{ vertical: '15px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;
const RightHeading = props => (
  <Heading level={4} margin={{ vertical: '15px' }} {...props} />
);
const StyledRightHeading = styled(RightHeading)`
  font-weight: normal;
`;

function CountryPeople({ data, countryTitle }) {
  return (
    <Styled pad="medium">
      <Heading level={2}>
        <FormattedMessage
          {...messages.title}
          values={{
            country: countryTitle,
          }}
        />
      </Heading>
      <div>
        <Text>
          <FormattedMessage {...messages.intro} />
        </Text>
      </div>
      {data &&
        data.map(dim => (
          <div key={dim.key}>
            <StyledDimensionHeading>
              <FormattedMessage {...rootMessages.dimensions[dim.key]} />
            </StyledDimensionHeading>
            {dim.rights &&
              Object.values(dim.rights).map(i => (
                <div key={i.key}>
                  <StyledRightHeading>
                    <FormattedMessage {...rootMessages.rights[i.key]} />
                  </StyledRightHeading>
                  {Object.values(i.atRiskData).map((d, index, array) => (
                    <WordCloud
                      key={d.code}
                      data={d}
                      dimension={i.dimension}
                      showTitle={array.length > 1}
                    />
                  ))}
                </div>
              ))}
          </div>
        ))}
    </Styled>
  );
}

CountryPeople.propTypes = {
  countryTitle: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default CountryPeople;
