/**
 *
 * Word
 *
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Drop, Button, ResponsiveContext, Text } from 'grommet';
import { scaleLinear } from 'd3-scale';
import Tooltip from 'components/Tooltip';
import rootMessages from 'messages';
import messages from './messages';

const Tag = styled(Box)`
  opacity: ${props => props.opacity || 1};
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: ${props => props.theme.global.colors[props.color]};
  font-weight: ${props => props.weight || 400};
`;

const StyledDrop = styled(Drop)`
  margin: 0 0 13px;
  overflow: visible;
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    width: 0;
    height: 0;
    border-top: 8px solid ${props => props.theme.global.colors['dark-1']};
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

export function Word({
  score,
  tooltip,
  dimension,
  right,
  intl,
  active,
  setActive,
}) {
  const [over, setOver] = useState(false);

  const button = useRef(null);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="center" key={score.people_code}>
          <Tag
            key={score.people_code}
            weight={scaleFontWeight(score.proportion)}
            opacity={over || active ? 1 : scaleOpacity(score.proportion)}
            size={
              size === 'small'
                ? scaleFontMobile(score.proportion) * MAX_SIZE_MOBILE
                : scaleFont(score.proportion) * MAX_SIZE
            }
            color={active ? 'highlight2' : `${dimension}Cloud`}
            direction="row"
            align="center"
          >
            <Button
              ref={button}
              onClick={evt => {
                if (evt) evt.preventDefault();
                if (evt) evt.stopPropagation();
                setActive(!active);
              }}
              onMouseEnter={() => setOver(true)}
              onMouseLeave={() => setOver(false)}
              onFocus={() => setOver(true)}
              onBlur={() => setOver(false)}
              margin={{ horizontal: 'xsmall' }}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <FormattedMessage
                {...rootMessages['people-at-risk'][score.people_code]}
              />
            </Button>
            {over && !active && button.current && (
              <StyledDrop
                align={{ bottom: 'top' }}
                stretch={false}
                elevation="small"
                target={button.current}
              >
                <Box
                  pad={{ vertical: 'small', horizontal: 'small' }}
                  background="dark-1"
                  style={{ maxWidth: '320px' }}
                  align="start"
                >
                  <Text size="xxlarge">
                    {`${Math.round(100 * score.proportion)}%`}
                  </Text>
                  <Text>
                    of our human rights experts identified
                    <strong>
                      {` ${intl.formatMessage(
                        rootMessages['people-at-risk'][score.people_code],
                      )} `}
                    </strong>
                    as being at risk of having their
                    <strong>
                      {` ${intl.formatMessage(rootMessages.rights[right])} `}
                    </strong>
                    violated.
                  </Text>
                </Box>
              </StyledDrop>
            )}
          </Tag>
          {tooltip && (
            <Tooltip
              iconSize="large"
              text={intl.formatMessage(messages.tooltip)}
            />
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Word.propTypes = {
  score: PropTypes.object,
  dimension: PropTypes.string,
  right: PropTypes.string,
  tooltip: PropTypes.bool,
  border: PropTypes.bool,
  intl: intlShape.isRequired,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default injectIntl(Word);
