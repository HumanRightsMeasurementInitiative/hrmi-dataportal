import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonPlain from 'styled/ButtonPlain';
import { Box } from 'grommet';
import { FormNext } from 'grommet-icons';
// prettier-ignore
const HeaderCategories = styled(Box)`
  margin: 0 50px 0 0;
`;

const CategoryLink = styled(ButtonPlain)`
  padding: 0 3px;
  padding-left: ${({ firstChild }) => (firstChild ? 0 : 3)}px;
  color: ${({ theme }) => theme.global.colors.dark};
  font-size: ${({ theme }) => theme.text.small.size};
  font-weight: 600;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-left: ${({ firstChild }) => (firstChild ? 2 : 3)}px;
  }
`;
const IconWrap = styled.span`
  margin-top: -3px;
`;
const SepWrap = styled.span`
  padding: 0 3px;
  font-size: 10px;
  line-height: 10px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 4px;
    font-size: 12px;
    line-height: 12px;
  }
`;

function Breadcrumb({ items, onItemClick, breadcrumb }) {
  return (
    <HeaderCategories direction="row" wrap>
      {items.map((item, index, list) => (
        <Box key={item.key} direction="row" align="center">
          <CategoryLink
            onClick={() => onItemClick(item.key, item.value)}
            firstChild={index === 0}
          >
            {item.label}
          </CategoryLink>
          {!breadcrumb && index < list.length - 1 && <SepWrap>|</SepWrap>}
          {breadcrumb && (
            <IconWrap>
              <FormNext color="#262262" />
            </IconWrap>
          )}
        </Box>
      ))}
    </HeaderCategories>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  breadcrumb: PropTypes.bool,
};

export default Breadcrumb;
