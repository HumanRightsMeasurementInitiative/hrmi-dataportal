import React from 'react';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

const Styled = styled(Paragraph)`
  font-size: 13px;
  line-height: 16px;
  margin-top: ${({ above }) => (above ? 20 : 0)}px;
  margin-bottom: ${({ above }) => (above ? 0 : 20)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export default function HTRParagraph(props) {
  return <Styled {...props} />;
}
