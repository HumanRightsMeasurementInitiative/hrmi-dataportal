import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';
import { FormNext, Share } from 'grommet-icons';

import ButtonTextIcon from 'styled/ButtonTextIcon';

const StyledText = styled(Text)`
  font-weight: 600;
  line-height: ${({ theme }) => theme.text.small.height};
  margin: 1em 0;
`;

function MethodologyLink({ external, text, ...rest }) {
  return (
    <ButtonTextIcon
      size="small"
      margin={{ vertical: 'xxsmall' }}
      gap={external ? 'small' : '0'}
      icon={external ? <Share size="small" /> : <FormNext size="medium" />}
      label={<StyledText size="small">{text}</StyledText>}
      {...rest}
    />
  );
}
MethodologyLink.propTypes = {
  text: PropTypes.node,
  external: PropTypes.bool,
};

export default MethodologyLink;
