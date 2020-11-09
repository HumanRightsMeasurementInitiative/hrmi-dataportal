import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: right;
  top: ${({ offsetTop }) => (offsetTop ? '-7px' : 0)};
  right: ${({ offsetTop }) => (offsetTop ? 0 : '4px')};
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors.secondary};
`;
