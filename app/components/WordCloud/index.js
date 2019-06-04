/**
 *
 * WordCloud
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Text, Box } from 'grommet';
import { scaleLinear } from 'd3-scale';
import Tooltip from 'components/Tooltip';
import Source from 'components/Source';
import rootMessages from 'messages';
import messages from './messages';

const Styled = styled(Box)`
  width: 100%;
`;
const Words = styled(Box)`
  width: 100%;
  text-align: center;
  padding-bottom: 1em;
`;
const Tag = styled(Box)`
  opacity: ${props => props.opacity || 1};
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: ${props => props.theme.global.colors[props.color]};
  font-weight: ${props => props.weight || 400};
`;

const MAX_SIZE = 42;
const MIN_SIZE = 14;

const scaleFontWeight = value => {
  if (value >= 0.9) return 900;
  if (value >= 0.7) return 700;
  if (value >= 0.6) return 600;
  return 400;
};

const scaleFont = scaleLinear()
  .domain([0, 1])
  .range([MIN_SIZE / MAX_SIZE, 1]);

const scaleOpacity = scaleLinear()
  .domain([0, 1])
  .range([0.66, 1]);

const RightHeading = props => (
  <Heading
    responsive={false}
    margin={{ top: 'none', bottom: 'medium' }}
    {...props}
  />
);
const StyledRightHeading = styled(RightHeading)``;
const StyledRightHeadingAbove = styled(Text)`
  font-size: 14px;
  margin-top: 10px;
`;

export function WordCloud({ data, subright, dimension, intl, border = true }) {
  return (
    <Styled
      direction="column"
      pad={{ bottom: 'large', top: 'xsmall' }}
      border={border ? 'top' : false}
    >
      <StyledRightHeadingAbove>
        <FormattedMessage {...rootMessages.labels.atRiksFor} />
      </StyledRightHeadingAbove>
      <StyledRightHeading level={subright ? 5 : 4}>
        <FormattedMessage
          {...rootMessages.rights[data.subright || data.right]}
        />
      </StyledRightHeading>
      {data.scores.length === 0 && (
        <Text>
          <FormattedMessage {...messages.noGroupData} />
        </Text>
      )}
      <Words direction="column" align="center">
        {data.scores.length > 0 &&
          data.scores
            .sort((a, b) => (a.proportion > b.proportion ? -1 : 1))
            .map((s, index) => (
              <Box direction="row" align="center" key={s.people_code}>
                <Tag
                  key={s.people_code}
                  weight={scaleFontWeight(s.proportion)}
                  opacity={scaleOpacity(s.proportion)}
                  size={scaleFont(s.proportion) * MAX_SIZE}
                  color={`${dimension}Cloud`}
                  direction="row"
                  align="center"
                >
                  {`${intl.formatMessage(
                    rootMessages['people-at-risk'][s.people_code],
                  )} (${Math.round(100 * s.proportion)}%)`}
                </Tag>
                {index === 0 && (
                  <Tooltip
                    iconSize="large"
                    text={intl.formatMessage(messages.tooltip)}
                  />
                )}
              </Box>
            ))}
      </Words>
      {data.scores.length > 0 && <Source center />}
    </Styled>
  );
}

WordCloud.propTypes = {
  data: PropTypes.object,
  dimension: PropTypes.string,
  subright: PropTypes.bool,
  border: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(WordCloud);
