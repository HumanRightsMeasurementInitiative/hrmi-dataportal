import styled from 'styled-components';

export default styled.span`
  color: ${({ theme }) => theme.global.colors['dark-3']};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
`;
