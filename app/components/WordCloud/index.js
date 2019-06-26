/**
 *
 * WordCloud
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Text, Box, ResponsiveContext } from 'grommet';
import { scaleLinear } from 'd3-scale';
import Tooltip from 'components/Tooltip';
import Source from 'components/Source';
import Hint from 'styled/Hint';
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
const MAX_SIZE_MOBILE = 33;
const MIN_SIZE_MOBILE = 11;

const scaleFontWeight = value => {
  if (value >= 0.9) return 900;
  if (value >= 0.7) return 700;
  if (value >= 0.6) return 600;
  return 400;
};

const scaleFont = scaleLinear()
  .domain([0, 1])
  .range([MIN_SIZE / MAX_SIZE, 1]);
const scaleFontMobile = scaleLinear()
  .domain([0, 1])
  .range([MIN_SIZE_MOBILE / MAX_SIZE_MOBILE, 1]);

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
  const scores =
    data.scores &&
    data.scores.length > 0 &&
    data.scores.sort((a, b) => {
      if (a.proportion === b.proportion) {
        return intl.formatMessage(
          rootMessages['people-at-risk'][a.people_code],
        ) > intl.formatMessage(rootMessages['people-at-risk'][b.people_code])
          ? 1
          : -1;
      }
      return a.proportion > b.proportion ? -1 : 1;
    });

  return (
    <ResponsiveContext.Consumer>
      {size => (
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
          {!scores && (
            <Hint italic>
              <FormattedMessage {...messages.noGroupData} />
            </Hint>
          )}
          <Words direction="column" align="center">
            {scores &&
              scores.map((s, index) => (
                <Box direction="row" align="center" key={s.people_code}>
                  <Tag
                    key={s.people_code}
                    weight={scaleFontWeight(s.proportion)}
                    opacity={scaleOpacity(s.proportion)}
                    size={
                      size === 'small'
                        ? scaleFontMobile(s.proportion) * MAX_SIZE_MOBILE
                        : scaleFont(s.proportion) * MAX_SIZE
                    }
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
          {scores && <Source center />}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
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
