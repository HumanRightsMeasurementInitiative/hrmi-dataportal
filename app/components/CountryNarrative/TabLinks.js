import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonText from 'styled/ButtonText';
import { Text, Box } from 'grommet';
// prettier-ignore
const Styled = styled(Box)`
`;
// prettier-ignore
const TabLink = styled(ButtonText)`
  font-weight: 400;
  padding: 0 5px;
  text-decoration: none;
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 0 10px;
  }
`;

const textSize = level => {
  if (level === 1) return 'medium';
  if (level === 2) return 'small';
  return 'xsmall';
};

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
              <Text size={textSize(level)}>{item.label}</Text>
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
