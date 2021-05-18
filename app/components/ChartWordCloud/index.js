/**
 *
 * ChartWordCloud
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Text, Box } from 'grommet';
import Source from 'components/Source';
import Hint from 'styled/Hint';

import quasiEquals from 'utils/quasi-equals';

import rootMessages from 'messages';
import Word from './Word';
import messages from './messages';

const Styled = styled(Box)`
  width: 100%;
  position: relative;
`;
const Words = styled(Box)`
  width: 100%;
  text-align: center;
  padding-bottom: 1em;
`;

const TextWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const RightHeading = props => (
  <Heading
    responsive={false}
    margin={{ top: 'none', bottom: 'none' }}
    {...props}
  />
);
const StyledRightHeading = styled(RightHeading)``;
const StyledRightHeadingAbove = styled(Text)`
  font-size: 14px;
  margin-top: 10px;
`;

export function ChartWordCloud({
  data,
  subright,
  dimension,
  intl,
  border = true,
  highlight,
  setHighlight,
  showTitle,
  onClickWord,
}) {
  const [activeWord, setActiveWord] = useState(null);

  const scores =
    data.scores &&
    data.scores.length > 0 &&
    // map to use people_code 9a rather than 9 for word cloud
    data.scores
      .map(s => (s.people_code === '9' ? { ...s, people_code: '9a' } : s))
      .sort((a, b) => {
        if (a.proportion === b.proportion) {
          return intl.formatMessage(
            rootMessages['people-at-risk'][a.people_code],
          ) > intl.formatMessage(rootMessages['people-at-risk'][b.people_code])
            ? 1
            : -1;
        }
        return a.proportion > b.proportion ? -1 : 1;
      });
  // prettier-ignore
  const wordHighlighted = highlight && scores
    ? scores.find(s => quasiEquals(s.people_code, highlight))
    : activeWord;

  return (
    <Styled
      direction="column"
      pad={{ bottom: 'large', top: 'xsmall' }}
      border={border ? 'top' : false}
    >
      {showTitle && (
        <StyledRightHeadingAbove>
          <FormattedMessage {...rootMessages.labels.atRiksFor} />
        </StyledRightHeadingAbove>
      )}
      {showTitle && (
        <StyledRightHeading level={subright ? 5 : 4}>
          <FormattedMessage
            {...rootMessages.rights[data.subright || data.right]}
          />
        </StyledRightHeading>
      )}
      {scores && (
        <TextWrap>
          <Box>
            <Text size="small" style={{ fontStyle: 'italic' }}>
              <FormattedMessage {...messages.interpretation} />
            </Text>
          </Box>
          {!activeWord && (
            <Box>
              <Text size="medium">&nbsp;</Text>
            </Box>
          )}
          {wordHighlighted && (
            <Box>
              <Text size="medium">
                <span style={{ fontWeight: 700 }}>
                  {`${Math.round(100 * wordHighlighted.proportion)}% `}
                </span>
                <FormattedMessage {...messages.highlightStart} />
                <span style={{ color: '#DB7E00', fontWeight: 600 }}>
                  {` ${intl.formatMessage(
                    rootMessages['people-at-risk'][wordHighlighted.people_code],
                  )} `}
                </span>
                <FormattedMessage {...messages.highlightEnd} />
              </Text>
            </Box>
          )}
        </TextWrap>
      )}
      {!scores && (
        <TextWrap>
          <Hint italic>
            <FormattedMessage {...messages.noGroupData} />
          </Hint>
        </TextWrap>
      )}
      <Words direction="column" align="center">
        {scores &&
          scores.map(s => (
            <Word
              score={s}
              dimension={dimension}
              right={data.subright || data.right}
              key={s.people_code}
              setActive={active => {
                setActiveWord(active ? s : null);
                if (setHighlight) setHighlight(false);
                onClickWord(s.people_code);
              }}
              active={
                wordHighlighted && wordHighlighted.people_code === s.people_code
              }
            />
          ))}
      </Words>
      {scores && <Source center />}
    </Styled>
  );
}

ChartWordCloud.propTypes = {
  data: PropTypes.object,
  dimension: PropTypes.string,
  subright: PropTypes.bool,
  border: PropTypes.bool,
  showTitle: PropTypes.bool,
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setHighlight: PropTypes.func,
  intl: intlShape.isRequired,
  onClickWord: PropTypes.func,
};

export default injectIntl(ChartWordCloud);
