import styled from 'styled-components';

export default styled.span`
  color: ${({ theme }) => theme.global.colors.hint};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
`;
