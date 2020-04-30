import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

import ButtonTextIcon from 'styled/ButtonTextIcon';

const TextRelative = styled(Text)`
  font-weight: 400;
`;

function ButtonRelative({ text, previous, ...rest }) {
  return (
    <ButtonTextIcon
      size="small"
      margin={{ vertical: 'xxsmall' }}
      gap="0"
      icon={
        previous ? <FormPrevious size="medium" /> : <FormNext size="medium" />
      }
      reverse={!previous}
      label={<TextRelative size="small">{text}</TextRelative>}
      {...rest}
    />
  );
}
ButtonRelative.propTypes = {
  text: PropTypes.node,
  previous: PropTypes.bool,
};

export default ButtonRelative;
