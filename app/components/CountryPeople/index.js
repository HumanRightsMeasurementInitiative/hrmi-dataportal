/**
 *
 * CountryPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Text } from 'grommet';

import { scaleLinear } from 'd3-scale';

import rootMessages from 'messages';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const CloudWrap = styled.div`
  text-align: center;
  width: 100%;
`;
const Tag = styled.div`
  max-width: 600px;
  margin: 0 auto;
  opacity: ${props => props.opacity || 1};
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: ${props => props.theme.global.colors[props.color]};
`;

const Styled = styled.div`
  max-width: 1000px;
  padding: 0 50px;
  margin: 0 auto;
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

const MAX_SIZE = 36;
const MIN_SIZE = 14;

const scaleFont = scaleLinear()
  .domain([0, 1])
  .range([MIN_SIZE / MAX_SIZE, 1]);

const scaleOpacity = scaleLinear()
  .domain([0, 1])
  .range([0.66, 1]);

function CountryPeople({ data, countryTitle }) {
  return (
    <Styled>
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
          <div>
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
                    <CloudWrap key={d.code}>
                      {array.length > 1 && (
                        <Heading level={5}>
                          <FormattedMessage
                            {...rootMessages.rights[d.subright || d.right]}
                          />
                        </Heading>
                      )}
                      {d.scores
                        .sort((a, b) => (a.proportion > b.proportion ? -1 : 1))
                        .map(s => (
                          <Tag
                            opacity={scaleOpacity(s.proportion)}
                            size={scaleFont(s.proportion) * MAX_SIZE}
                            color={`${i.dimension}Cloud`}
                          >
                            <FormattedMessage
                              {...rootMessages['people-at-risk'][s.people_code]}
                            />
                            <span>
                              {` (${Math.round(100 * s.proportion)}%)`}
                            </span>
                          </Tag>
                        ))}
                    </CloudWrap>
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
