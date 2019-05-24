import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'styled/Button';
import { Text } from 'grommet';
// prettier-ignore
const HeaderCategories = styled.div`
  margin: 0;
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    margin: 0 -2px;
  }
`;
// prettier-ignore
const CategoryLink = styled(Button)`
  padding: 0 3px;
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 0 6px;
  }
`;

function HeaderLinks({ items, onItemClick, spacer }) {
  return (
    <HeaderCategories>
      {items.map((item, index, list) => (
        <span key={item.key}>
          <CategoryLink onClick={() => onItemClick(item.key, item.value)}>
            <Text size="small">{item.label}</Text>
          </CategoryLink>
          {index < list.length - 1 && (
            <>
              {spacer}
              {!spacer && <span>|</span>}
            </>
          )}
        </span>
      ))}
    </HeaderCategories>
  );
}

HeaderLinks.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  spacer: PropTypes.node,
};

export default HeaderLinks;
