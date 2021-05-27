import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  color: ${({ color, theme }) => (color ? theme.global.colors[color] : 'grey')};
  width: auto;
  font-weight: ${({ active, highlight }) => {
    if (active) return 700;
    if (highlight) return 600;
    return 400;
  }};
  text-shadow: ${({ theme }) => theme.global.outline};
  font-size: ${({ active, highlight }) => {
    if (active) return 18;
    if (highlight) return 14;
    return 12;
  }}px;
  line-height: ${({ active, highlight }) => {
    if (active) return 20;
    if (highlight) return 16;
    return 14;
  }}px;
`;
// color: black;
// margin-top: 4px;
// padding: 2px;
// line-height: 14px;
// text-align: left;
// background: rgba(255, 255, 255, 0.9);
