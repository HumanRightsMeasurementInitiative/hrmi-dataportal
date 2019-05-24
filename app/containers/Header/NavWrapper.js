import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  width: 100%;
  max-width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.global.colors.white};
  color: ${({ theme }) => theme.global.colors.text.light};
  z-index: 1000;
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    position: relative;
    width: 400px;
  }
`;
