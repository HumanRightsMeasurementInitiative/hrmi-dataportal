import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';
import styled from 'styled-components';

import DropOption from 'styled/DropOption';

const Styled = styled.div`
  padding-bottom: 16px;
`;

// prettier-ignore
const GroupLabel = styled.div`
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 2px;
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding-left: 16px;
    padding-top: 15px;
    padding-bottom: 3px;
  }
`;

const FilterOptions = ({ optionGroups, onSelect }) => (
  <Styled>
    {optionGroups &&
      optionGroups.map((group, index, list) => (
        <div key={group.group}>
          <GroupLabel>
            <Text size="xsmall">{group.label}</Text>
          </GroupLabel>
          {group.options &&
            group.options.map(option => (
              <DropOption
                key={option.value}
                onClick={() => onSelect(option)}
                noBorderLast={index === list.length - 1}
              >
                {option.label}
              </DropOption>
            ))}
        </div>
      ))}
  </Styled>
);

FilterOptions.propTypes = {
  onSelect: PropTypes.func,
  optionGroups: PropTypes.array,
};

export default FilterOptions;
