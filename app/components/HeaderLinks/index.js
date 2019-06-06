import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'styled/Button';
import { Box } from 'grommet';
import { FormNext } from 'grommet-icons';
// prettier-ignore
const HeaderCategories = styled(Box)`
  margin: 0 50px 0 0;
`;

const CategoryLink = styled(Button)`
  padding: 0 3px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 0 6px;
  }
`;
const IconWrap = styled.span`
  margin-top: -3px;
`;
const SepWrap = styled.span`
  padding: 0 3px;
  font-size: 10px;
  line-height: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 0 4px;
    font-size: 12px;
    line-height: 12px;
  }
`;

function HeaderLinks({ items, onItemClick, breadcrumb }) {
  return (
    <HeaderCategories direction="row" wrap>
      {items.map((item, index, list) => (
        <Box key={item.key} direction="row" align="center">
          <CategoryLink onClick={() => onItemClick(item.key, item.value)}>
            {item.label}
          </CategoryLink>
          {!breadcrumb && index < list.length - 1 && <SepWrap>|</SepWrap>}
          {breadcrumb && (
            <IconWrap>
              <FormNext />
            </IconWrap>
          )}
        </Box>
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
