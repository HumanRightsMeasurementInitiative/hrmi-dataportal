import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'styled/Button';
import { Text } from 'grommet';
import { FormNext } from 'grommet-icons';
// prettier-ignore
const HeaderCategories = styled.div`
  margin: 0;
`;
// prettier-ignore
const CategoryLink = styled(Button)`
  padding: 0 3px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 0 3px;
  }
`;
const IconWrap = styled.span`
  position: relative;
  top: 1px;
`;
const SepWrap = styled.span`
  padding: 2px 6px;
  font-size: 12px;
`;

function HeaderLinks({ items, onItemClick, breadcrumb }) {
  return (
    <HeaderCategories>
      {items.map((item, index, list) => (
        <span key={item.key}>
          <CategoryLink onClick={() => onItemClick(item.key, item.value)}>
            <Text size="small">{item.label}</Text>
          </CategoryLink>
          {!breadcrumb && index < list.length - 1 && <SepWrap>|</SepWrap>}
          {breadcrumb && (
            <IconWrap>
              <FormNext />
            </IconWrap>
          )}
        </span>
      ))}
    </HeaderCategories>
  );
}

HeaderLinks.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  breadcrumb: PropTypes.bool,
};

export default HeaderLinks;
