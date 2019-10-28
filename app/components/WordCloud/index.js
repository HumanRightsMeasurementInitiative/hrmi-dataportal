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
import Source from 'components/Source';
import Hint from 'styled/Hint';
import rootMessages from 'messages';
import Word from './Word';
import messages from './messages';

const Styled = styled(Box)`
  width: 100%;
`;
const Words = styled(Box)`
  width: 100%;
  text-align: center;
  padding-bottom: 1em;
`;

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
            <Word
              score={s}
              tooltip={index === false}
              dimension={dimension}
              right={data.subright || data.right}
              key={s.people_code}
            />
          ))}
      </Words>
      {scores && <Source center />}
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
