import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Button, Box, Collapsible, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

function Accordion({ head, content, buttonText }) {
  const [open, setOpen] = useState(false);
  return (
    <Box direction="column">
      <Box direction="row">
        {head}
        <Button onClick={() => setOpen(!open)}>
          <Box direction="row">
            <Text size="xsmall">{buttonText}</Text>
            {!open && <FormDown />}
            {open && <FormUp />}
          </Box>
        </Button>
      </Box>
      <Collapsible open={open}>{content}</Collapsible>
    </Box>
  );
}

Accordion.propTypes = {
  head: PropTypes.node,
  content: PropTypes.node,
  buttonText: PropTypes.string,
};

export default Accordion;
