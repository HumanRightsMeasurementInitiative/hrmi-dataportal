import React, { useState, useRef, useLayoutEffect } from 'react';
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
    top: ${({ top }) => `-${top}px`};
    padding-right: ${({ theme, image }) =>
    image ? 0 : theme.global.edgeSize.xlarge};
  }
`;

function Aside({ content, image, active, children, ...other }) {
  const [top, setTop] = useState(0);
  const asideEl = useRef(null);
  useLayoutEffect(() => {
    if (asideEl.current) {
      setTop(asideEl.current.clientHeight);
    }
  }, [asideEl]);
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          ref={asideEl}
          width={getAsideWidth(size)}
          direction="column"
          flex={{ shrink: 0 }}
          fill="vertical"
          image={image}
          top={top}
          {...other}
        >
          {content
            ? content.content({ active })
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
