import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.dark};
  background-color: ${({ theme }) => theme.global.colors.white};
  border-radius: 5px;
  margin: 20px 0;
  font-size: ${({ theme }) => theme.text.small.size};
  padding: 10px 20px;
  &:hover {
    background-color: rgba(255,255,255,0.85);
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
