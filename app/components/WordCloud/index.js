/**
 *
 * WordCloud
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Text } from 'grommet';
import { scaleLinear } from 'd3-scale';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
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

const MAX_SIZE = 36;
const MIN_SIZE = 14;

const scaleFont = scaleLinear()
  .domain([0, 1])
  .range([MIN_SIZE / MAX_SIZE, 1]);

const scaleOpacity = scaleLinear()
  .domain([0, 1])
  .range([0.66, 1]);

export function WordCloud({ data, showTitle, dimension }) {
  return (
    <Styled key={data.code}>
      {showTitle && (
        <Heading level={5}>
          <FormattedMessage
            {...rootMessages.rights[data.subright || data.right]}
          />
        </Heading>
      )}
      {data.scores.length === 0 && (
        <Text>
          <FormattedMessage {...messages.noGroupData} />
        </Text>
      )}
      {data.scores.length > 0 &&
        data.scores
          .sort((a, b) => (a.proportion > b.proportion ? -1 : 1))
          .map(s => (
            <Tag
              key={s.people_code}
              opacity={scaleOpacity(s.proportion)}
              size={scaleFont(s.proportion) * MAX_SIZE}
              color={`${dimension}Cloud`}
            >
              <FormattedMessage
                {...rootMessages['people-at-risk'][s.people_code]}
              />
              <span>{` (${Math.round(100 * s.proportion)}%)`}</span>
            </Tag>
          ))}
    </Styled>
  );
}

WordCloud.propTypes = {
  data: PropTypes.object,
  dimension: PropTypes.string,
  showTitle: PropTypes.bool,
};

export default WordCloud;
