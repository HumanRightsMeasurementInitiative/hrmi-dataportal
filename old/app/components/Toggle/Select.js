import styled, { css } from 'styled-components';

const Select = styled.select`
  line-height: 1em;
  background-color: ${props =>
    props.inverse ? props.theme.colors.dark : 'transparent'};
  border-style: none;
  ${props =>
    props.inverse
      ? css`
          color: ${props.theme.colors.white};
        `
      : ''}
`;

export default Select;
