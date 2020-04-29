import styled from 'styled-components';
import Button from './Button';

// Large prominent Button designed to work on dark background

// prettier-ignore
export default styled(Button)`
  color: ${({ theme, secondary }) => (secondary ? 'white' : theme.global.colors.dark)};
  background-color: ${({ secondary }) => (secondary ? 'transparent': 'white')};
  border-radius: 5px;
  margin: 20px 0;
  font-size: ${({ theme }) => theme.text.small.size};
  padding: 10px 20px;
  &:hover {
    color: ${({ theme, secondary }) => (secondary ? 'white' : theme.global.colors.dark)};
    background-color: ${({ theme, secondary }) => (secondary ? theme.global.colors.dark : 'rgba(255,255,255,0.9)')};
}
&:active {
  border-radius: 5px;
}
&:visited {
  border-radius: 5px;
}
&:focus {
  border-radius: 5px;
}
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    padding: 10px 20px;
  }
`;
