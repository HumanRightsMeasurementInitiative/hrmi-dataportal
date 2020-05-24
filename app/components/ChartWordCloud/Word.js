/**
 *
 * Word
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, ResponsiveContext, Text } from 'grommet';
import { scaleLinear } from 'd3-scale';
import { isMinSize, isMaxSize } from 'utils/responsive';
import rootMessages from 'messages';
import messages from './messages';

const Tag = styled(Box)`
  opacity: ${props => props.opacity || 1};
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: ${props => props.theme.global.colors[props.color]};
  font-weight: ${props => props.weight || 400};
`;
const StyledButton = styled(Button)`
  position: relative;
`;
const StyledDrop = styled(Box)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  display: block;
  width: 300px;
  max-width: 300px;
  text-align: left;
  margin: 0 0 13px -150px;
  overflow: visible;
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  z-index: 8;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    width: 0;
    height: 0;
    border-top: 8px solid ${props => props.theme.global.colors.dark};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    margin: 0 auto;
  }
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

export function Word({ score, dimension, intl, active, setActive }) {
  const [over, setOver] = useState(null);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="center" key={score.people_code}>
          <Tag
            key={score.people_code}
            weight={scaleFontWeight(score.proportion)}
            opacity={over || active ? 1 : scaleOpacity(score.proportion)}
            size={
              isMaxSize(size, 'sm')
                ? scaleFontMobile(score.proportion) * MAX_SIZE_MOBILE
                : scaleFont(score.proportion) * MAX_SIZE
            }
            color={over || active ? 'highlight2' : `${dimension}Cloud`}
            direction="row"
            align="center"
          >
            <StyledButton
              onClick={evt => {
                if (evt) evt.preventDefault();
                if (evt) evt.stopPropagation();
                if (isMinSize(size, 'medium')) setActive(!active);
                if (isMaxSize(size, 'sm')) setOver(!over);
              }}
              onMouseEnter={() => {
                if (isMinSize(size, 'medium')) setOver(true);
              }}
              onMouseOut={() => setOver(false)}
              onFocus={() => {
                if (isMinSize(size, 'medium')) setOver(true);
              }}
              onBlur={() => setOver(false)}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <FormattedMessage
                {...rootMessages['people-at-risk'][score.people_code]}
              />
              {over && !active && (
                <StyledDrop elevation="small" fixed={isMaxSize(size, 'sm')}>
                  <Box
                    pad={{ vertical: 'small', horizontal: 'small' }}
                    background="dark"
                    align="start"
                    responsive={false}
                  >
                    <Text size="xxlarge">
                      {`${Math.round(100 * score.proportion)}%`}
                    </Text>
                    <Text style={{ maxWidth: '276px' }}>
                      <FormattedMessage {...messages.highlightStart} />
                      <strong>
                        {` ${intl.formatMessage(
                          rootMessages['people-at-risk'][score.people_code],
                        )} `}
                      </strong>
                      <FormattedMessage {...messages.highlightEnd} />
                    </Text>
                  </Box>
                </StyledDrop>
              )}
            </StyledButton>
          </Tag>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Word.propTypes = {
  score: PropTypes.object,
  dimension: PropTypes.string,
  border: PropTypes.bool,
  intl: intlShape.isRequired,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default injectIntl(Word);
