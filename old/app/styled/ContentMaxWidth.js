import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

// prettier-ignore
const Styled = styled(Box)`
  margin: 0 auto;
  width: 100%;
  position: relative;
  min-height: auto;
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  max-width: ${({ theme }) => `${theme.sizes.containerMaxWidth}px` || '1600px'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-left: ${({ theme }) => theme.global.edgeSize.medium};
    padding-right: ${({ theme, hasAside }) => hasAside ? 0 : theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-left: ${({ theme }) => theme.global.edgeSize.xlarge};
    padding-right: ${({ theme, hasAside }) => hasAside ? 0 : theme.global.edgeSize.xlarge};
  }
  @media print {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export function ContentMaxWidth(props) {
  return <Styled direction={props.column ? 'column' : 'row'} {...props} />;
}

ContentMaxWidth.propTypes = {
  column: PropTypes.bool,
  hasAside: PropTypes.bool,
};

export default ContentMaxWidth;
