import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'styled/Button';

// prettier-ignore
const Styled = styled(Button)`
  text-align: right;
  padding: 2px 3px;
  line-height: 16px;
  min-height: ${({ allowWordBreak }) => allowWordBreak ? 26 : 20}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 8px;
    min-height: ${({ allowWordBreak }) => allowWordBreak ? 40 : 20}px;
    line-height: 19px;
  }
`;

function BarLabelButton({ label, onClick, allowWordBreak }) {
  return (
    <Styled allowWordBreak={allowWordBreak} onClick={() => onClick()}>
      {label}
    </Styled>
  );
}

BarLabelButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  allowWordBreak: PropTypes.bool,
};

export default BarLabelButton;
