import React from 'react';
import useDimensions from 'react-use-dimensions';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { getAsideWidth } from 'utils/responsive';

// prettier-ignore
const Styled = styled(Box)`
  justify-content: center;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-right: ${({ theme, image }) =>
    image ? 0 : theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    position: sticky;
    top: ${({ top }) => `-${top - 44}px`};
    padding-right: ${({ theme, image }) =>
    image ? 0 : theme.global.edgeSize.xlarge};
  }
`;

function Aside({ content, image, active, children, ...other }) {
  const [asideRef, { height }] = useDimensions();
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          width={getAsideWidth(size)}
          direction="column"
          flex={{ shrink: 0 }}
          fill="vertical"
          image={image}
          top={height}
          {...other}
        >
          {content
            ? content.content({ active, asideRef })
            : children
          }
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

Aside.propTypes = {
  image: PropTypes.bool,
  content: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Aside;
