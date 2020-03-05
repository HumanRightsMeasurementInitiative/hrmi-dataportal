import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  position: relative;
  border-top: 0;
  overflow-x: hidden;
`;
// @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
// }

export function SectionContainer(props) {
  return (
    <Styled
      responsive={false}
      pad={props.pad || { top: 'small', bottom: 'large' }}
      {...props}
    />
  );
}

SectionContainer.propTypes = {
  pad: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default SectionContainer;
