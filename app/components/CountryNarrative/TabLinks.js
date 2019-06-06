import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ButtonText from 'styled/ButtonText';
import { Box } from 'grommet';
// prettier-ignore
const Styled = styled(Box)`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    display: flex;
  }
`;
// prettier-ignore
const TabLink = styled(ButtonText)`
  font-weight: 400;
  padding: 0 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 10px;
  }
`;

const textSize = level => {
  if (level === 1) return 'medium';
  if (level === 2) return 'small';
  return 'xsmall';
};

const Text = styled.span`
  font-size: ${({ theme, level }) => theme.text[textSize(level)].size};
  ${({ level }) =>
    level === 3 &&
    css`
      top: -1px;
      position: relative;
    `}
`;

function TabLinks({ items, onItemClick, level }) {
  return (
    <Styled direction="row" align="center">
      {items.map(
        item =>
          item.skip || (
            <TabLink
              key={`${item.key}${item.value}`}
              onClick={() => onItemClick(item.key, item.value)}
            >
              <Text level={level}>{item.label}</Text>
            </TabLink>
          ),
      )}
    </Styled>
  );
}

TabLinks.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  level: PropTypes.number,
};

export default TabLinks;
