import styled from 'styled-components';

export default styled.div`
  border-right: ${props => props.theme.columnHeader.border};
  border-width: ${props => (props.main ? 1 : 0)}px;
  }};
`;
